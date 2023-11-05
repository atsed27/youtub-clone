import express from 'express';
import { VerifyToken } from '../verifyToken.js';
import { addComment, deleteComment,GetComment } from '../controller/comment.js';

const router = express.Router();

//Create comment

router.post('/',VerifyToken,addComment);

//Delete comment

router.delete("/:id",VerifyToken,deleteComment);

// Get comment 
router.get('/:VideoId',VerifyToken,GetComment);

export default router;