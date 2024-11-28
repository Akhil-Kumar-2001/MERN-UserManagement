import User from "../../models/userSchema.js";


export const adminLogin=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(email === process.env.ADMIN_USERNAME && password=== process.env.ADMIN_PASSWORD){
            return res.status(200).json({status:"success",message:"admin login success"})
        }
        return res.status(400).json({status:false,message:"invalid credential"})
        
    } catch (error) {
        next(error)
        
    }

}

export const userDetails = async (req, res, next) => {
    try {
        let userDetail = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
        
        // Ensure you're sending an array of users
        console.log("userDetail",userDetail)
        res.status(200).json(userDetail);
        
    } catch (error) {
        next(error);
    }
}

export const deleteUser=async(req,res,next)=>{
 try {
    const userId=req.params.id;
    const user=await User.findByIdAndDelete(userId);
    if(!user){
        return res.status(404).json({status:false,message:"user not found"})
    }

    res.status(200).json({status:true,message:"user deleted successfully"})
    
 } catch (error) {
    next(error)
    
 }
}


export const editUser=async(req,res,next)=>{
    try {
        const userId=req.params.id;
        const {username,email}=req.body;

        const userDetail=await User.findByIdAndUpdate(userId,{username,email},{new:true})
        if (!userDetail) {
            
            return res.status(404).json({ message: "User not found", status:false });
        }

        res.status(200).json({userDetail,message:"user details updated successfully", status:true});
        
    } catch (error) {
        next(error)
        
    }
}

export const addUser=async(req,res,next)=>{
    try {

        const {username,email,password}=req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const newUser=new User({username,email,password});
        await newUser.save();
        res.status(200).json({newUser,status:true,message:"New user created successfully"})
        
    } catch (error) {
        next(error)
        
    }

}


