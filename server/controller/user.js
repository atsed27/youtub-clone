import { CreateError } from "../error.js"
import User from "../model/User.js";
import Video from "../model/Video.js";

export const UpdateUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const UpdateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            });
            res.status(200).json(UpdateUser);
        } catch (error) {
            next(error);
        }
    }
    else{
        return next(CreateError(404,"You can update only your account"));

    }
}
export const DeleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
             await User.findByIdAndDelete(req.params.id);
             res.status(200).json("User has been deleted");
        } catch (error) {
            next(error);
        }
    }
    else{
        return next(CreateError(404,"You can Delete only your account"));

    }
}
export const GetUser = async (req,res,next)=>{
    try {
        const GetUser = await User.findById(req.params.id);
        res.status(200).json(GetUser);
    } catch (error) {
        next(error)
    }
}
export const SubscribeUser = async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUser:req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1},

        });
        res.status(200).json("Subscription is successfully ");
         
    } catch (error) {
        next(error);
    }
}
export const UnSubscribe = async (req,res,next)=>{
    try {
        await User.findById(req.user.id,{
            $pull:{subscribedUser:req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1},

        });

        res.status(200).json("UnSubscription is successfully ");
         
    } catch (error) {
        next(error);
    }
}
export const like = async (req,res,next)=>{
    const user = req.user.id;
    const videoId = req.params.id;
    try {
         await Video.findByIdAndUpdate(videoId,{
            $addToSet:{Like:user},
            $pull:{disLike:user}
         });
         res.status(200).json("your like the video")
    } catch (error) {
        next(error);
    }
}
export const disLike = async (req,res,next)=>{
    const user = req.user.id;
    const videoId = req.params.id;
    try {
         await Video.findByIdAndUpdate(videoId,{
            $addToSet:{disLike:user},
            $pull:{like:user}
         });
         res.status(200).json("your Dislike the video")
    } catch (error) {
        next(error);
    }
}