import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TestProfImg from "../assets/sasuke-github.jpeg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="text-xl font-semibold">
          Connectify
        </Link>
        <div className="flex items-center gap-5">
          <div className="avatar hidden lg:inline-block">
            <div className="w-12 rounded-full">
              <img src={currentUser.photoURL} />
            </div>
          </div>
          <p>{currentUser.displayName}</p>
          <button
            className="btn btn-neutral"
            onClick={async () => await signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
