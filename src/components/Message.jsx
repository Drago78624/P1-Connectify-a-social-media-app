import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const chatWindowRef = useRef();

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={chatWindowRef}
      className={`chat ${
        currentUser.uid == message.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              message.senderId == currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
          />
        </div>
      </div>
      <div className="chat-header">Obi-Wan Kenobi</div>
      <div className="chat-bubble">{message.textMsg}</div>
      <div className="chat-footer opacity-50">Just now</div>
    </div>
  );
};

export default Message;
