import {Routes,Route} from 'react-router-dom';
import SignUpPage from "./components/SignUpPage";
import SignInPage from './components/SignInPage';
import ProductPage from './components/ProductPage';
import GettingGmail from './components/GettingGmail';
import CheckOtp from './components/CheckOtp';
import NewPassword from './components/NewPassword';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function App() {
  const navigate=useNavigate();
  useEffect(()=>{
    const fetch=async()=>{
      try{
        const response=await axios.get("http://localhost:5000/api/all/authCheck",{withCredentials:true});
        if(response.status==200){
          navigate("/ProductPage");
        }
      }catch(err){
        navigate("/SignInPage");
        console.log(err);
      }
    };
    fetch();
  },[navigate]);
  return (
    <>
     <Routes>
      <Route path='/' element={<SignUpPage />}></Route>
      <Route path='/SignInPage' element={<SignInPage />}></Route>
      <Route path='/ProductPage' element={<ProductPage />}></Route>
      <Route path='/GettingGmail' element={<GettingGmail />}></Route>
      <Route path='/CheckOtp' element={<CheckOtp />}></Route>
      <Route path='NewPassword' element={<NewPassword />}></Route>
     </Routes>
    </>
  )
}
export default App