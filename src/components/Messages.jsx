import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../contexts/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from "../contexts/AuthContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      console.log("checking msg")
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unsub();
  }, [data.chatId]);

  return (
    <div className="max-h-[600px] px-4 overflow-y-auto ">
      {messages && messages.map((m) => {
        // TODO: fix the msg positioning bug
        const msgPostition = currentUser.uid == m.senderId ? "chat-end" : "chat-start"
        return <Message message={m} key={m.id} msgPostition={msgPostition} />
      })}
    </div>
  );
};

export default Messages;
