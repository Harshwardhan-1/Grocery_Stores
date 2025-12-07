import { userModel } from "../models/userModel";
import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
export const getAll=async(req:Request,res:Response)=>{
    const allUser=await userModel.find();
    res.status(200).json({
        allUser
    })
}

export const getSignUp=async(req:Request,res:Response)=>{
const {name,email,password}=req.body;
if(!name || !email || !password){
    return res.status(401).json({
        message:"Fill Your Details Properly",
    });
}
const check=await userModel.findOne({email});
if(check){
    return res.status(401).json({
        message:"Something went wrong",
    });
}

bcrypt.genSalt(12,function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash){
        const newUser=await userModel.create({
    name,
    email,
    password:hash,
});
let token=jwt.sign({email:newUser.email,userId:newUser._id},"H@rshyadav0991");
res.cookie("token",token);
res.status(200).json({
    message:"User logged in Successfully",
    data:newUser,
})
    });
});
}


export const getSignIn=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).json({
            message:"Enter details properly"
        });
    }
    const oldUser=await userModel.findOne({email});
    if(!oldUser){
        return res.status(401).json({
            message:"User not found",
        });
    }
    if(!oldUser.password){
        return res.status(401).json({
            message:"Something went wrong",
        });
    }
    bcrypt.compare(password, oldUser.password, function(err, result) {
        console.log(result);
        if(!result){
            return res.status(401).json({
                message:"password is incorrect",
            });
        }
        let token=jwt.sign({email:oldUser.email,userId:oldUser._id},"H@rshyadav0991");
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        });
        res.status(200).json({
            message:"Successfully login",
            data:{email}
        })
});

}



export const getGmail=async(req:Request,res:Response)=>{
    const {email}=req.body;
    if(!email){
        return res.status(401).json({
            message:"Enter a valid email",
        });
    }
    const check=await userModel.findOne({email});
    if(!check){
        return res.status(401).json({
            message:"Something went wrong",
        });
    }
    let newOtp=Math.floor(100000+Math.random()*900000);
    check.otp=newOtp;
    check.otpExpire=new Date(Date.now()+2*60*1000);
    await check.save();
    const transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"harshwardhany87@gmail.com",
            pass:"qdlu msyi yymt tjxk",
        }
    });
    await transport.sendMail({
        from:"harshwardhany87@gmail.com",
        to:email,
        subject:"Your otp is",
        text:`Your otp is${newOtp} it will expire in 2 minutes`,
    });
    res.status(200).json({
        message:"OTP send successfully",
        data:check,
    });
}




export const getCheckOtp=async(req:Request,res:Response)=>{
const {otp,email}=req.body;
if(!otp){
    return res.status(401).json({
        message:"Enter valid otp",
    });
}
const verifyOtp=await userModel.findOne({email});
if(!verifyOtp){
    return res.status(401).json({
        message:"User not found",
    })
}
if(!verifyOtp.otpExpire || !verifyOtp.otp){
    return res.status(401).json({
        message:"Something went wrong",
    });
}
if(verifyOtp.otpExpire.getTime()<Date.now()){
    return res.status(401).json({
        message:"otp expired",
    });
}
if(verifyOtp.otp!==Number(otp)){
    return res.status(401).json({
        message:"otp is not matched",
    })
}
if(verifyOtp.otp===Number(otp)){
    verifyOtp.otp=null, 
    verifyOtp.otpExpire=null;
    await verifyOtp.save();
    res.status(200).json({
        message:"User otp is correct",
        data:verifyOtp,
    });
}
}



export const getChangePassword=async(req:Request,res:Response)=>{
const {password,confirm,email}=req.body;
if(!password || !confirm || !email){
    return res.status(401).json({
        message:"Enter details properly",
    });
}
const checkUser=await userModel.findOne({email});
if(!checkUser){
    return res.status(401).json({
        message:"Something went wrong",
    });
}      
if(!checkUser.password){
    return res.status(401).json({
        message:"Somthing not found",
    });
} 
const changePassword=await bcrypt.genSalt(12);
const confirmChange=await bcrypt.hash(password,changePassword);
checkUser.password=confirmChange;
await checkUser.save();
res.status(200).json({
    message:"Password Change Successfully",
    data:checkUser,
})
}