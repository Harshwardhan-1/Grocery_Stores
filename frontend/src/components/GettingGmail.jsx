import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './GettingGmail.css';
export default function GettingGmail(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
        const send={email};
        try{
        const response=await axios.post("http://localhost:3000/api/all/gettingGmail",send,{withCredentials:true});
        if(response.data.message==="OTP send successfully"){
            navigate("/checkOtp",{state:{ram:response.data.data}});
        }
        }catch(err){
           if(err.response?.data?.message==="Something went wrong"){
            alert("Something went wrong");
           }else if(err.response?.data?.message==="Enter a valid email"){
            alert("Enter a valid email");
           }
        }
    }
    return(
        <>
          <div className="gmail-container">
      <div className="gmail-card">
        <h1 className="gmail-title">Enter your gmail here</h1>
        <form onSubmit={handle} className="gmail-form">
  <input type="email" placeholder="Enter your email here" name="email" onChange={(e)=>setEmail(e.target.value)}/>
  <button type='submit'>Submit</button>
        </form>
        </div>
        </div>
        </>
    );
}