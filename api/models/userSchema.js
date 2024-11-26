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
        default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;