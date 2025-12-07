import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';
const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
 let token=req.cookies?.token;
 if(!token){
    return res.status(401).json({
        message:"Do a Sign up First",
    });
 }   
 const data=jwt.verify(token,"H@rshyadav0991");
 (req as any).user=data;
 next();
}

export default verifyToken;