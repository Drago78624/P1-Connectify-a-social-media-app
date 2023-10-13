import React from "react";
import { Link } from "react-router-dom";
import TestProfImg from "../assets/sasuke-github.jpeg";

const Navbar = () => {
  return (
    <div className="p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/home" className="text-xl font-semibold">
          Connectify
        </Link>
        <div className="flex items-center gap-5">
          <div className="avatar hidden lg:inline-block">
            <div className="w-12 rounded-full">
              <img src={TestProfImg} />
            </div>
          </div>
          <button className="btn btn-neutral">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
