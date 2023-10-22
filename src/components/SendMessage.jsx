import React, { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { BiImageAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { db, storage } from "../firebase.config";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const SendMessage = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const sendMessage = async (msgData) => {
    const textMsg = msgData.text;
    const img = msgData.image[0];

    setLoading(true);
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        // SAVING USER DATA ( UID, DISPLAYNAME, EMAIL, PHOTOURL ) IN FIRESTORE AFTER SIGN UP
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                textMsg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            setLoading(false);
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          textMsg,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setLoading(false);
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        textMsg,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        textMsg,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    reset();
  };

  return (
    <div className="p-4 bg-base-200">
      <form onSubmit={handleSubmit(sendMessage)} className="flex gap-3">
        <div className="w-full flex gap-2">
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered shadow-lg"
              {...register("text")}
            />
          </div>
          <div className="form-control">
            <label htmlFor="imageUpload" className="btn btn-outline shadow-lg">
              <BiImageAlt fontSize={24} />
            </label>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              {...register("image")}
            />
          </div>
        </div>
        <button onClick={sendMessage} className="btn btn-secondary shadow-lg">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <MdSend fontSize={24} />
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
