import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO;

const connectDB = async () =>{
    try{
        await mongoose.connect(url);
        console.log("Database connected"); 
    }catch(error){
        console.error("Error in connecting to database:", error);
        process.exit(1);
    }
}

export default connectDB;