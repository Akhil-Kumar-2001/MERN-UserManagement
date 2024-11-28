import User from "../../models/userSchema.js";
import { errorHandler } from "../../utils/error.js";
import bcryptjs from 'bcryptjs'
import fs from 'fs';
import path from 'path';

export const test = (req,res)=>{
    res.json({
        message:"API is Working"
    })
}

//update user

export const updateUser = async (req, res, next) => {
    if(req.user.id != req.params.id){
        // Clean up uploaded file if unauthorized
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return next(errorHandler(401, "You can update only your account"))
    }
    try {
        // Prepare update object
        const updateData = {
            username: req.body.username,
            email: req.body.email
        };

        // Handle password update
        if(req.body.password) {
            updateData.password = await bcryptjs.hash(req.body.password, 10);
        }

        // Handle profile picture update
        if (req.file) {
            // Delete old profile picture if it exists (except default)
            const user = await User.findById(req.params.id);
            if (user.profilePicture && 
                !user.profilePicture.includes('shutterstock.com')) {
                const oldImagePath = path.join(process.cwd(), 'uploads/profiles', 
                    path.basename(user.profilePicture));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Set new profile picture path
            updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        // Remove password from response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        // Clean up uploaded file if error occurs
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(error);  
    }
}


// delete uesr


export const deleteUser =  async (req,res,next) =>{
    if(req.user.id != req.params.id){
        return next(errorHandler(401,'You can only delete your account!'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted... ')
    } catch (error) {
       next(error)
    }
} 