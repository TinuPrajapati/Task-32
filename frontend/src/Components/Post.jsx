import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const sendDetails = async (e) => {
    e.preventDefault();
    if (!title) {
      return alert("Please enter a title");
    }
    if (!content) {
      return alert("Please enter a content");
    }
    try {
      const respone = await axios.post(
        `${import.meta.env.VITE_API_URL}/protected/post`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(respone.data);
      navigate("/read");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessKey");
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert("Please Login first and then check data");
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white gap-4">
      <h1 className="text-3xl font-serif border-b-2 border-sky-400">Post</h1>
      <form
        className="w-[30%] h-[60%] flex flex-col items-center gap-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-10"
        onSubmit={sendDetails}
      >
        <div className="w-full">
          <label htmlFor="title" className="block text-xl mb-1 font-serif">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="w-[100%] h-10 rounded-md text-black outline-none px-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="content" className="block text-xl mb-1 font-serif">
            Content:
          </label>
          <textarea
            name=""
            id="content"
            className="w-[100%] h-28 rounded-md text-black outline-none px-4 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="bg-white text-sky-400 w-[40%] py-3 text-xl font-serif rounded-md active:scale-90 duration-200">
          Add
        </button>
      </form>
    </div>
  );
}

export default Post;
