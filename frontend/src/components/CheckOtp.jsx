import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckOtp.css';
export default function CheckOtp(){
    const navigate=useNavigate();
    const [otp,setOtp]=useState("");
    const location=useLocation();
    const harsh=location.state?.ram;

    const handle=async(e)=>{
        e.preventDefault();
        const send={otp,email:harsh.email};
        try{
        const response=await axios.post("http://localhost:5000/api/all/CheckOtp",send,{withCredentials:true});
        if(response.data.message==="User otp is correct"){
            navigate("/NewPassword",{state:{charu:response.data.data}});
        }    
    }catch(err){
        if(err.response?.data?.message=== "Enter valid otp"){
            alert("Enter a valid otp");
        }else if(err.response?.data?.message=== "otp expired"){
            alert("your otp has expired");
        }else if(err.response.data.message==="otp is not matched"){
            alert("Something went wrong");
        }
    }
    }
        return(
        <>
            <div className="otp-container">
      <div className="otp-card">
        <h1  className="otp-title">Enter a 6 digit otp send on your gmail</h1>
        <form onSubmit={handle} className="otp-form">
            <input type="text" placeholder='Enter your otp here' name='otp' onChange={(e)=>setOtp(e.target.value)}/>
            <button type='submit'>Click here</button>
        </form>
        </div>
        </div>
        </>
    );
}