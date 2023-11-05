import jwt from 'jsonwebtoken'
import {CreateError} from './error.js'
export const VerifyToken = (req,res,next)=>{
    const token = req.cookies.tokenye;
    if(!token){
        return next(CreateError(401,"You are not authenticated"));
    };
    jwt.verify(token,process.env.Jwt_S,(err,user)=>{
        if(err) return next(CreateError(403,"Token is invalid"));
        req.user = user;
        
        next();
    })
}