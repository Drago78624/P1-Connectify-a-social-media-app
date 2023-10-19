import React, { useContext } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { ChatContext } from "../contexts/ChatContext";
import { BsArrowUpLeft } from "react-icons/bs";

const ChatWindow = () => {
  const { data } = useContext(ChatContext);

  if (data.chatId == "null") {
    return (
      <div className="lg:flex-[4] min-h-[800px] flex justify-center items-center">
        <div className="text-center">
          <BsArrowUpLeft className="mx-auto lg:hidden" fontSize={24} />
          <h2 className="text-2xl mt-2">Choose a chat to start conversation</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:flex-[4] w-full flex flex-col justify-between">
        <div className="p-4 shadow-lg">
          <h2 className="text-lg font-semibold">{data.user?.displayName}</h2>
        </div>
        <Messages />
        <SendMessage />
      </div>
    </>
  );
};

export default ChatWindow;
