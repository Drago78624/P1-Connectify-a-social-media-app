import React from "react";
import { Link } from "react-router-dom";
import TestProfImg from "../assets/sasuke-github.jpeg";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import { RiMenu2Line } from "react-icons/ri";
import { BsArrowUpLeft } from "react-icons/bs";

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <Drawer />
      <div className="p-4 flex justify-between items-center lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-square">
          <RiMenu2Line fontSize={24} />
        </label>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={TestProfImg} />
          </div>
        </div>
      </div>
      {/* Chat Window */}
      <div className="h-[70%] flex items-center justify-center p-4">
        <div>
          <BsArrowUpLeft className="mx-auto" fontSize={24} />
          <h2 className="text-xl mt-2">Choose a chat to start conversation</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
