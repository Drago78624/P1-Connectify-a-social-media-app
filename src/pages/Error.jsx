import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-semibold text-5xl mb-2">404</h1>
        <p className="mb-4 text-2xl">Page not found!</p>
        <Link to="/" className="btn btn-secondary shadow-lg">
          Back to App
        </Link>
      </div>
    </div>
  );
};

export default Error;
