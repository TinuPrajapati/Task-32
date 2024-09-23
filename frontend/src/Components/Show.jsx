import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  

  useEffect(() => {
    const storedToken = localStorage.getItem("accessKey");
    if (storedToken) {
      async function readData() {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/protected/read`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );
          setData(response.data)
        } catch (err) {
          console.log(err.response.data);
        }
      }
      readData();
    } else {
      alert("Please Login first and then check data");
    }
    
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex flex-col gap-4">
      <header className="bg-white w-full h-[10%] flex justify-between items-center px-10 rounded-md text-xl font-serif">
        <h1>File Handling</h1>
        <Link
          to="/post"
          className="bg-sky-400 text-white h-[80%] w-[15%] rounded-md active:scale-90 duration-200 flex justify-center items-center "
        >
          Add Post
        </Link>
      </header>
      <div className="w-[100%] h-[90%] bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md grid grid-cols-4 grid-rows-3 p-4 gap-2">
        {data.map((el,index) => (
          <div
            key={index}
            className=" bg-white p-2 rounded-md flex flex-col justify-evenly items-center"
          >
            <h3>Title: {el.title}</h3>
            <p>Content: {el.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
