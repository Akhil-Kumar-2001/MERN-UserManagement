import express from 'express'
import { test } from '../controller/user/userController.js';
import { google, signin, signup } from '../controller/user/signupController.js';

const router = express.Router();

router.get('/',test);
router.post('/signup',signup);  
router.post('/signin',signin);
router.post('/google',google);

export default router;