import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto max-w-md p-4">
        <div className="text-center mb-10">
          <Link to="/home">heelu</Link>
          <h1 className="text-3xl mb-2 font-semibold">Sign up</h1>
          <p className="text-xl">Join us and start connecting!</p>
        </div>
        <form className="text-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            className="input input-bordered w-full max-w-md mb-4 shadow-lg"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full max-w-md mb-4 shadow-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-md shadow-lg"
          />
          <div className="text-center">
            <label className="label">
              <span className="label-text">Add an Avatar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-md mb-4 shadow-lg"
            />
          </div>
          <button className="btn btn-primary w-full max-w-md mb-4 shadow-lg">
            Sign up
          </button>
          <p>
            Already have an account ?{" "}
            <Link to="/" className="underline">
              Sign in
            </Link>
          </p>
          {error && <span>something went wrong</span>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
