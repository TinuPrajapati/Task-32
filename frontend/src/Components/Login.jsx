import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Common from "./Common";

function Login() {
  const [username ,setName] = useState("");
  const [password ,setPassword] = useState("");
  const navigate = useNavigate();

  const sendData =async (e)=>{
    e.preventDefault();
    try{
       const response=await axios.post(`${import.meta.env.VITE_API_URL}/login`,{
        username,password
      });
      localStorage.setItem("accessKey",response.data.token)
      alert(response.data.message)
      navigate("/post")
    }catch(err){
      console.log(err)
    }
   
  }
  return (
    <Common title={"Login"} sendData={sendData} setName={setName} setPassword={setPassword}/>
  );
}

export default Login;
