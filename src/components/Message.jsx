import React from "react";
import TestProfImg from "../assets/sasuke-github.jpeg";


const Message = () => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={TestProfImg} />
        </div>
      </div>
      <div className="chat-header">Obi-Wan Kenobi</div>
      <div className="chat-bubble">You were the Chosen One!</div>
      <div className="chat-footer opacity-50">Just now</div>
    </div>
  );
};

export default Message;
