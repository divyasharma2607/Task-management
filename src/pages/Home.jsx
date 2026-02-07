import React from "react";
import taskImage from "../assets/taskImage.png";
import Login from "./Login";

const Home = () => {
  return (
    <div className="bg-black text-white h-screen  flex gap-8 p-10">
      
      <div className="h-80 w-80 rounded-lg shadow-lg mt-30 ">
        <img
          src={taskImage}
          alt="Task Management"
          className="w-75 h-75 "
        />
      </div>

      <div className="max-w-md mt-30">
        <h1 className="text-4xl font-bold mb-4">
          Task Management System
        </h1>
        <p className="text-lg">
          Task management is the systematic process of planning, prioritizing,
          tracking, and executing tasks through their entire lifecycle.
        </p>
      </div>
     
      <Login />
    </div>
  );
};

export default Home;
