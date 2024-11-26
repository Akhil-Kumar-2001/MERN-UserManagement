import express from 'express';  
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js'
import connectDB  from './Congfig/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Backend port 3321


const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 7227

connectDB()

app.use(cookieParser())

app.use('/api/user',userRoute);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
    
})



