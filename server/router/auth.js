import express from "express";
import { signIn, signup } from "../controller/auth.js";

const router = express.Router();

//Create user
router.post('/signup',signup)

//signIn user
router.post("/signIn",signIn);


export default router;