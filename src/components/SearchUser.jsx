import React, { useContext, useEffect, useState } from "react";
import ChatPreview from "../components/ChatPreview";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from "../contexts/AuthContext";

const SearchUser = () => {
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

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
    const timeout = setTimeout(() => {
      setError(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
      {error && <Alert />}
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
      {error && <span>User Not Found !</span>}
      <div className="mt-4" onClick={handleSelect}>
        {user && (
          <ChatPreview
            displayName={user.displayName}
            photoURL={user.photoURL}
          />
        )}
      </div>
    </div>
  );
};

export default SearchUser;
