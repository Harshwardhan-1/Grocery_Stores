import {useState} from 'react';
import axios from 'axios';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
export default function SignUpPage(){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    const handle=async(e)=>{
        e.preventDefault();
        const send={name,email,password};
        try{
        const response=await axios.post("http://localhost:3000/api/all/signup",send,{withCredentials:true});
        if(response.data.message==="User logged in Successfully"){
            navigate("/SignInPage",{state:{harsh:response.data.data}});
        }
        }catch(err){
            if(err.response?.data?.message=== "Fill Your Details Properly"){
                alert("Fill your details properly");
            }else if(err.response?.data?.message=== "Something went wrong"){
                alert("Something went wrong");
            }
    }
    };
    return(
        <>
         <div className="signup-container">
                  <div className="signup-card">
        <h1>Welcome to Sign Up Page</h1>
        <form onSubmit={handle} className="signup-form">
            <input type="text" placeholder="Enter your name here" name="name" onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Enter your email here" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password here" name="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit"/>
        </form>
        <p>Already have an acoount?{" "} <span onClick={()=>navigate("/SignInPage")}>SignIn here</span></p>
        </div>
        </div>
        </>
    );
}