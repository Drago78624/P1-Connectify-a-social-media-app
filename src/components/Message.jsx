import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import moment from "moment/moment";

function formatFirebaseTimestamp(timestamp) {
  const date = timestamp.toDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
  return formattedTime;
}

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const chatWindowRef = useRef();

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const timeInMiliseconds = message.date.seconds * 1000;

  const timeAgo = moment(timeInMiliseconds).fromNow();

  const formattedTime = formatFirebaseTimestamp(message.date);

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
      <div className="chat-bubble">
        {message.img && <img className="my-2" src={message.img} />}
        <span>{message.textMsg}</span>
      </div>
      <div className="chat-footer opacity-50">{formattedTime}</div>
    </div>
  );
};

export default Message;
