import { useLocation } from "react-router-dom";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './NewPassword.css'
export default function NewPassword(){
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [confirm,setConfirm]=useState("");
    const location=useLocation();
    const harsh=location.state?.charu;
    const handle=async(e)=>{
        e.preventDefault();
        if(password!=confirm){
            alert("password and confirm password dont match");
            return;
        }
        const send={password,confirm,email:harsh.email};
        try{
        const response=await axios.post("http://localhost:3000/api/all/changePassword",send,{withCredentials:true});
        if(response.data.message==="Password Change Successfully"){
            navigate("/SignInPage");
        }
    }catch(err){
        if(err.response?.data?.message==="Something went wrong"){
            alert("Something went wrong");
        }
    }
}
    return(
        <>
            <div className="newpass-container">
             <div className="newpass-card">
            <h1 className="newpass-title">Set Your New Password</h1>
        <form onSubmit={handle} className="newpass-form">
            <input type="password" placeholder="Enter new password here" name="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" placeholder="Enter confirm password" name="password" onChange={(e)=>setConfirm(e.target.value)}/>
            <button type="submit">Click here</button>
        </form>
        </div>
        </div>
        </>
    );
}