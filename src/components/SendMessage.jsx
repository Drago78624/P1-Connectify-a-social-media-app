import React from "react";
import {MdSend} from "react-icons/md"

const SendMessage = () => {
  return (
    <div className="p-4 bg-base-200">
      <form action="" className="flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered w-full shadow-lg"
        />
        <button className="btn btn-primary shadow-lg">
          <MdSend fontSize={24} />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
