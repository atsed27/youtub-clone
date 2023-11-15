import express from 'express';
import { googleAuth, signIn, signup } from '../controller/auth.js';

const router = express.Router();

//Create user
router.post('/signup', signup);

//signIn user
router.post('/signIn', signIn);

//google login
router.post('/google', googleAuth);

export default router;
