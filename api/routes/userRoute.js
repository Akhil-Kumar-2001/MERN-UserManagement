import express from 'express'
import { deleteUser, test, updateUser } from '../controller/user/userController.js';
import { google, signin, signup, signout } from '../controller/user/signupController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test);
router.post('/signup',signup);  
router.post('/signin',signin);
router.post('/google',google);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/signout',signout);

export default router;