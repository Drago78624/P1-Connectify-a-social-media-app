import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto max-w-md p-4">
        <div className="text-center mb-10">
          <Link to="/home">heelu</Link>
          <h1 className="text-3xl mb-2 font-semibold">Sign up</h1>
          <p className="text-xl">Join us and start connecting!</p>
        </div>
        <form className="text-center">
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;
