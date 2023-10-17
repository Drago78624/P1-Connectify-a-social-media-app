import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "../components/Alert";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().email().required("Please enter an email"),
    password: yup.string().min(8).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSignin = async (data) => {
    setLoading(true);
    try {
      console.log("singing in")
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/")
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
          <h1 className="text-3xl mb-2 font-semibold">Sign in</h1>
          <p className="text-xl">Enter your world of connections.</p>
        </div>
        <form onSubmit={handleSubmit(onSignin)}>
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
          {loading ? (
            <button className="w-full btn btn-primary shadow-lg mb-4">
              <span className="loading loading-spinner"></span>
              Signing in
            </button>
          ) : (
            <button className="w-full btn btn-primary shadow-lg mb-4">
              Sign in
            </button>
          )}
          <p className="text-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
