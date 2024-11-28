import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,  
    },
    profilePicture:{
        type:String,
        default: "/uploads/profiles/blank-profile-picture-973460_1280.webp"
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;