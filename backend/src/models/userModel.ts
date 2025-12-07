import mongoose from 'mongoose';
const mongooseConnect=mongoose.connect("mongodb://127.0.0.1:27017/authentication")
.then(()=>{
console.log("Mongoose connected");
}).catch((err)=>{console.log(err)});

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    otp:Number,
    otpExpire:Date,
})

export const userModel=mongoose.model("user",userSchema);
