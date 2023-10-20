import React, { useContext } from "react";
import TestProfImg from "../assets/sasuke-github.jpeg";
import { AuthContext } from "../contexts/AuthContext";

const Message = ({ message, msgPosition }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={`chat ${msgPosition}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={TestProfImg} />
        </div>
      </div>
      <div className="chat-header">Obi-Wan Kenobi</div>
      <div className="chat-bubble">{message.textMsg}</div>
      <div className="chat-footer opacity-50">Just now</div>
    </div>
  );
};

export default Message;
