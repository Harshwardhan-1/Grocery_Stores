import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function ProductPage(){
    const navigate=useNavigate();
    const [data,setData]=useState("");
    useEffect(()=>{
        const fetch=async()=>{
            try{
            const response=await axios.get("http://localhost:5000/api/all/authCheck",{withCredentials:true});
            if(response.data?.user){
                setData(response.data.user)
            }else{
                navigate("/SignInPage");
            }
            }catch(err){
                navigate("/SignInPage");
                console.log(err);
            }
        };
        fetch();
    },[navigate]);
    return(
        <>
       <h1>harsh</h1>
       {
        data && (
            <div>
                <p>{data.email}</p>
            </div>
        )
       }
        </>
    );
}