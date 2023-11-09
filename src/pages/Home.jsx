import React from "react";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import { RiMenu2Line } from "react-icons/ri";
import ChatWindow from "../components/ChatWindow";
import Chats from "../components/Chats";
import SearchUser from "../components/SearchUser";
import TestProfImg from "../assets/levi.jpg";

const Home = () => {
  console.log("rest")

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
      <div className="h-[70%] mt-10 lg:h-auto container max-w-7xl mx-auto flex justify-center shadow-2xl">
        <div className="lg:block min-h-[800px] overflow-y-auto hidden flex-[2] bg-base-200 p-4">
          <div>
            <SearchUser />
            <div className="divider"></div>
            <Chats />
          </div>
        </div>
        <ChatWindow />
      </div>
    </div>
  );
};

export default Home;
