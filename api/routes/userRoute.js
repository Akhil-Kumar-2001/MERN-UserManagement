import express from 'express'
import { test, updateUser } from '../controller/user/userController.js';
import { google, signin, signup } from '../controller/user/signupController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test);
router.post('/signup',signup);  
router.post('/signin',signin);
router.post('/google',google);
router.post('/update/:id',verifyToken,updateUser)

export default router;