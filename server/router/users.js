import express from 'express';
import {
  DeleteUser,
  GetUser,
  UpdateUser,
  SubscribeUser,
  UnSubscribe,
  like,
  disLike,
} from '../controller/user.js';
import { VerifyToken } from '../verifyToken.js';

const router = express.Router();

//Update user

router.put('/:id', VerifyToken, UpdateUser);

//delete user

router.delete('/:id', VerifyToken, DeleteUser);

//Get  user

router.get('/find/:id', GetUser);

//Subscribe a user

router.put('/sub/:id', VerifyToken, SubscribeUser);

//Unsubscribe a user

router.put('/unSub/:id', VerifyToken, UnSubscribe);

//like video users

router.put('/like/:id', VerifyToken, like);

//disLike video

router.put('/dislike/:id', VerifyToken, disLike);
export default router;
