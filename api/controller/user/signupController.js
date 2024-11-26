import User from "../../models/userSchema.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../../utils/error.js";
import jwt from 'jsonwebtoken'


export const signup = async (req,res,next) =>{

    const {username,email,password} = req.body;
    const hashedPassword = await bcryptjs.hash(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({ message : "New User Created Succesfully" });
    } catch (error) {
        next(error)
    }

};


export const signin = async (req,res,next)=>{
        const {email,password} = req.body;
        try {
            const validUser = await User.findOne({ email })

            if(!validUser){
                return next(errorHandler(401,"User not found"));
            }

            const validPassword =  await bcryptjs.compare(password,validUser.password);
            if(!validPassword) {
                return next(errorHandler(401,'Wrong Credential'))
            }
                const token = jwt.sign({ id : validUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' } );

                 // Exclude password before sending user data
                const {password:hashedPassword, ...userWithoutPassword } = validUser._doc;

            res
            .cookie('token',token,{ httpOnly:true })
            .status(200).json(userWithoutPassword)
        } catch (error) {
            next(error)
        }
}