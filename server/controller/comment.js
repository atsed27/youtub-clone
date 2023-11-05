import express from 'express';
import Comment from '../model/Comment.js'
import Video from '../model/Video.js';
import { CreateError } from '../error.js';
export const addComment = async (req,res,next)=>{
    const newComment = new Comment({...req.body,UserId:req.user.id,});
    try {
        const saveComment = await newComment.save();
        res.json(saveComment);
    } catch (error) {
        next(error);
    }
}
export const deleteComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id);

        if(req.user.id === comment.UserId ){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted"); 
        }else{
            return next(CreateError(404,"you can deleted  only your comment"));
        }

    } catch (error) {
        next(error);
    }
}

export const GetComment = async (req,res,next)=>{
    try {
        const getComment = await Comment.find({VideoId:req.params.VideoId});
        res.status(200).json(getComment);
    } catch (error) {
        next(error);
    }
}