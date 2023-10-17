import React from "react";
import TestProfImg from "../assets/levi.jpg";

const ChatPreview = (props) => {
  return (
    <div className="flex gap-4 items-center p-4 hover:bg-gray-900 cursor-pointer" >
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src={props.photoURL || TestProfImg} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{props.displayName || "Kashif Khan"}</h3>
        {/* <p>Heelu my friend</p> */}
      </div>
    </div>
  );
};

export default ChatPreview;
