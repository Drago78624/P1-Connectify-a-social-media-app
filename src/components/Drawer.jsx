import React from "react";
import ChatPreview from "./ChatPreview";

const Drawer = () => {
  return (
    <div className="drawer relative z-40">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
            <form action="">
              <input
                type="text"
                placeholder="Find User"
                className="input input-bordered w-full max-w-md"
              />
            </form>
            <div className="divider"></div>
            <div>
              <ChatPreview />
              <ChatPreview />
              <ChatPreview />
              <ChatPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
