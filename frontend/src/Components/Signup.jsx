import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Common from "./Common";

function Signup() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          username,
          password,
        }
      );
      alert(response.data);
      navigate("/login");
    } catch (err) {
      if(err.response.data == "User already exists"){
        alert("User already exists");
        navigate("/login")
      }else{
        alert(err.response.data)
      }
    }
  };

  return (
    <Common title={"Registeration"} sendData={sendData} setName={setName} setPassword={setPassword}/>
  );
}

export default Signup;
