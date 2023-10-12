import React from "react";
import TestProfImg from "../assets/levi.jpg";

const ChatPreview = () => {
  return (
    <div className="flex gap-4 items-center mb-4">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src={TestProfImg} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Kashif Khan</h3>
        <p>Heelu my friend</p>
      </div>
    </div>
  );
};

export default ChatPreview;
