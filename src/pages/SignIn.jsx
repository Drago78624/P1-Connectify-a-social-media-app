import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
      <div className="container mx-auto max-w-2xl p-4">
        <div className="text-center mb-10">
        <Link to="/home">heelu</Link>
          <h1 className="text-3xl mb-2 font-semibold">Sign in</h1>
          <p className="text-xl">Enter your world of connections.</p>
        </div>
        <form className="text-center">
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full max-w-md mb-4 shadow-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-md mb-4 shadow-lg"
          />
          <button className="btn btn-primary w-full max-w-md mb-4 shadow-lg">Sign in</button>
          <p>Don't have an account ? <Link to="/signup" className="underline">Sign up</Link></p>
        </form>
      </div>
  );
};

export default SignIn;
