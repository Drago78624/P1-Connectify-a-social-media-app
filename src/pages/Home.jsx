import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import TestProfImg from "../assets/sasuke-github.jpeg";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import { RiMenu2Line } from "react-icons/ri";
import { BsArrowUpLeft } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import ChatPreview from "../components/ChatPreview";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a user name"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  // SEARCH
  const searchUser = async (data) => {
    console.log("searching...");
    const q = query(
      collection(db, "users"),
      where("displayName", "==", data.username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      console.log("user not found");
      setError(true);
    }
  };
  // ADDING/SELECTING USER AFTER SEARCH
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        const updateRes = await updateDoc(
          doc(db, "userChats", currentUser.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        console.log(updateRes);

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    reset();
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });
    return () => unsub()
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="h-screen">
      {error && <Alert />}
      <Navbar />
      <Drawer />
      <div className="p-4 flex justify-between items-center lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-square">
          <RiMenu2Line fontSize={24} />
        </label>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={TestProfImg} />
          </div>
        </div>
      </div>
      {/* Chat Window */}
      <div className="h-[70%] mt-10 lg:h-auto container max-w-7xl mx-auto flex justify-center shadow-lg">
        <div className="lg:block min-h-[800px] overflow-y-auto hidden flex-[2] bg-base-200 p-4">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
            {/* SEARCH USER UI */}
            <form onSubmit={handleSubmit(searchUser)}>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Find a User"
                  className="input input-bordered w-full max-w-md"
                  {...register("username")}
                />
                <p className="text-error mt-1">
                  {errors.username && errors.username.message}
                </p>
              </div>
            </form>
            {/* SHOWING USER IF ANY AFTER SEARCH */}
            {error && <span>User Not Found !</span>}
            <div className="mt-4" onClick={handleSelect}>
              {user && (
                <ChatPreview
                  displayName={user.displayName}
                  photoURL={user.photoURL}
                />
              )}
            </div>
            <div className="divider"></div>
            <div>
              {Object.entries(chats)?.map(chat => {
                return <ChatPreview key={chat[0]} displayName={chat[1].userInfo.displayName} photoURL={chat[1].userInfo.photoURL} lastMessage={chat[1]?.lastMessage?.text && false} />
              })}
            </div>
          </div>
        </div>
        {/* <div className="lg:flex-[4]">
          <div className="text-center">
            <BsArrowUpLeft className="mx-auto lg:hidden" fontSize={24} />
            <h2 className="text-xl mt-2">
              Choose a chat to start conversation
            </h2>
          </div>
        </div> */}
        <div className="lg:flex-[4] w-full flex flex-col justify-between">
          <div className="p-4 shadow-lg">
            <h2 className="text-lg font-semibold">Kashif Khan</h2>
          </div>
          <div className="max-h-[600px] px-4 overflow-y-auto ">
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
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={TestProfImg} />
                </div>
              </div>
              <div className="chat-header">Anakin</div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Just now</div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
