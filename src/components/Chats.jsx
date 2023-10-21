import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import ChatPreview from "./ChatPreview";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });
    return () => unsub();
  }, []);

  const { dispatch } = useContext(ChatContext);

  const openChat = (userData) => {
    dispatch({ type: "CHANGE_USER", payload: userData });
  };

  return (
    <div>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
        return (
          <div key={chat[0]} onClick={() => openChat(chat[1].userInfo)}>
            <ChatPreview
              displayName={chat[1].userInfo.displayName}
              photoURL={chat[1].userInfo.photoURL}
              lastMessage={chat[1].lastMessage?.textMsg}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
