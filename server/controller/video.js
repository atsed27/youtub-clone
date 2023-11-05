import express from 'express';
import Video from '../model/Video.js';
import User from "../model/User.js"
import { CreateError } from '../error.js';

export const addVideo = async (req,res,next)=>{
    const newVideo = new Video({UserId:req.user.id,...req.body});
    try {
        const saveVideo = await newVideo.save();
        res.status(200).json(saveVideo);
    } catch (error) {
        next(error);
    }
}
export const UpdateVideo = async (req,res,next)=>{
    try {
        const video = Video.findById(req.params.id);
        if(!video) return next(CreateError(404,"video is not found"));
        if(req.user.id === Video.UserId){
            const UpdateVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true,
            })
            res.status(200).json(UpdateVideo);
        }else{
            return next(CreateError(403,"You can Update only yours video"));
            
        }
    } catch (error) {
        next(error);
    }
}
export const DeleteVideo = async (req,res,next)=>{
    try {
        const video = Video.findById(req.params.id);
        if(!video) return next(CreateError(404,"video is not found"));
        if(req.user.id === Video.UserId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("your Video is delete");
        }else{
            return next(CreateError(403,"You can Delate only yours video"));
            
        }
    } catch (error) {
        next(error);
    }
}

export const getVideo = async (req,res,next)=>{
    try {
        const video  = await Video.findById(req.params.id);
        res.status(200).json(video); 
    } catch (error) {
        next(error);
    }
}
export const addView = async (req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{Views:1}
        });
        res.status(200).json("views is added"); 
    } catch (error) {
        next(error);
    }
}
export const random = async (req,res,next)=>{
    try {
        const videos = await Video.aggregate([{ $sample: {size:40} }]);
        res.status(200).json(videos); 
    } catch (error) {
        next(error);
    }
}
export const trend = async (req,res,next)=>{
    try {
        const videos = await Video.find().sort({Views:-1});
        res.status(200).json(videos); 
    } catch (error) {
        next(error);
    }
}
export const sub = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        const SubscribedChannels = user.subscribedUser;

        const list = await Promise.all(
            SubscribedChannels.map((channelsID)=>{
                return Video.find({UserId:channelsID});
            })
        );
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (error) {
        next(error);
    }
}

export const getByTags = async (req,res,next)=>{
    const tags = req.query.tags.split(",");
    //console.log(tags);
    try {
        const video  = await Video.find({ tags:{$in:tags} }).limit(20);
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
}
export const search = async (req,res,next)=>{
    const title = req.query.title;
    try {
        const video = await Video.find({title : {$regex:title,$options:"i"}}).limit(40);
        res.status(200).json(video);
    } catch (error) {
        
    }
}
