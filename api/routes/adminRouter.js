import express from "express";
import { addUser, adminLogin,deleteUser,editUser,userDetails } from "../controller/admin/adminController.js";


const router=express.Router();

router.post('/login',adminLogin);
router.get('/user',userDetails);
router.delete('/delete-user/:id',deleteUser);
router.put('/edit-user/:id',editUser);
router.post('/add-user',addUser)



export default router;