import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  return (
    <div className="p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="text-xl font-semibold">
          Connectify
        </Link>
        <div className="flex items-center gap-5">
          {/* <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              Themes
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-72"
            >
              {themes.map((theme) => {
                return (
                  <li>
                    <span>{theme}</span>
                  </li>
                );
              })}
            </ul>
          </div> */}
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
