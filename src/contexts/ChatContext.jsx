import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase.config";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const {currentUser} = useContext(AuthContext)

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        if(action.type == "CHANGE_USER"){
            return {
                user: action.payload,
                chatId: currentUser.uid > action.payload.uid
                  ? currentUser.uid + action.payload.uid
                  : action.payload.uid + currentUser.uid
            }
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)


  return (
    <ChatContext.Provider value={{data: state, dispatch}}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;