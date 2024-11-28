import express from "express";
import { adminLogin,userDetails } from "../controller/admin/adminController.js";


const router=express.Router();

router.post('/login',adminLogin);
router.get('/user',userDetails);




export default router;