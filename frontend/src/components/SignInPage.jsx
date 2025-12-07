import { useLocation } from "react-router-dom";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignInPage.css';
export default function SignInPage(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const location=useLocation();
    const yadav=location.state?.harsh;
    
    const handle=async(e)=>{
        e.preventDefault();
        const send={email,password};
        try{
        const response=await axios.post("http://localhost:3000/api/all/signin",send,{withCredentials:true});
        if(response.data.message==="Successfully login"){
            navigate("/ProductPage",{state:{dinku:response.data.data}});
        }
    }catch(err){
        if(err.response?.data?.message==="Enter details properly"){
            alert("Enter Proper Valid Details")
        }else if(err.response?.data?.message=== "password is incorrect"){
            alert("Something went wrong try again");
        }
    }
    }


    const handlePassword=async()=>{
        navigate("/GettingGmail");
    }
    return(
        <>
            <div className="signin-container">
      <div className="signin-card">
        <h1>Welcome to sign in Page</h1>
        <form onSubmit={handle} className="signin-form">
            <input type="email" placeholder="Enter your email here" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password here" name="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" />
        </form>
        <p className="signin-footer">Dont have an account?{" "} <span onClick={()=>navigate("/SignUpPage")}>Sign up here</span></p>
        <p>Forgot your password</p>
        <button className="forgot-btn" onClick={handlePassword}>Click here</button>
        {
            yadav && (
                <div>
                    <p>{yadav.email}</p>
                    <p>{yadav.name}</p>
                </div>
            )
        }
        </div>
        </div>
        </>
    );
}