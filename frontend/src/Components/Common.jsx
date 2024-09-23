import React from 'react';

function Common ({title,sendData,setName,setPassword }) {
  return (
    <div
      className="w-[100vw] h-[100vh] bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col gap-4 justify-center items-center text-lg text-white"
    >
      <h1 className="text-3xl font-serif border-b-2 border-sky-400">{title}</h1>
      <form
        className="w-[30%] h-[50%] bg-white rounded-lg flex flex-col items-center gap-4 text-black py-4 px-10"
        onSubmit={sendData}
      >
        <div className="w-full">
          <label htmlFor="name" className="block">
            Username:
          </label>
          <input
            type="text"
            id="name"
            required
            className="border-2 w-full rounded-md h-10 px-4 outline-none text-md"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            required
            className="border-2 w-full rounded-md h-10 px-4 outline-none text-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-[50%] rounded-md bg-sky-400 text-white text-xl font-serif py-2 active:scale-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Common;