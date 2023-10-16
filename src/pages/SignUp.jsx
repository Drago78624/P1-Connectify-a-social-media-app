import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "../components/Alert";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    displayName: yup.string().required("Please enter a display name"),
    email: yup.string().email().required("Please enter an email"),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSignup = async (data) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const storageRef = ref(storage, data.displayName);

      const uploadTask = uploadBytesResumable(storageRef, data.avatar[0]);

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
          setError(true);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: data.displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: data.displayName,
              email: data.email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoading(false);
            navigate("/");
          });
        }
      );
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {error && <Alert />}
      <div className="container mx-auto max-w-md p-4">
        <div className="text-center mb-10">
          <Link to="/">heelu</Link>
          <h1 className="text-3xl mb-2 font-semibold">Sign up</h1>
          <p className="text-xl">Join us and start connecting!</p>
        </div>
        <form onSubmit={handleSubmit(onSignup)}>
          <div className="form-control mb-4">
            <input
              type="text"
              placeholder="Display Name"
              className="input input-bordered w-full max-w-md shadow-lg"
              {...register("displayName")}
            />
            <p className="text-error mt-1 ">
              {errors.displayName && errors.displayName.message}
            </p>
          </div>
          <div className="form-control mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full max-w-md shadow-lg"
              {...register("email")}
            />
            <p className="text-error mt-1">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className="form-control mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-md shadow-lg"
              {...register("password")}
            />
            <p className="text-error mt-1">
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full max-w-md shadow-lg"
              {...register("confirmPassword")}
            />
            <p className="text-error mt-1">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>
          <div className="text-center">
            <label className="label">
              <span className="label-text">Add an Avatar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-md mb-4 shadow-lg"
              {...register("avatar")}
            />
          </div>
          {loading ? (
            <button className="w-full btn btn-primary shadow-lg mb-4">
              <span className="loading loading-spinner"></span>
              Signing up
            </button>
          ) : (
            <button className="w-full btn btn-primary shadow-lg mb-4">
              Sign up
            </button>
          )}
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/signin" className="underline">
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
