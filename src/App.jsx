import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Chatlist from "./components/Chatlist";
import Chatbox from "./components/Chatbox";
import Navlinks from "./components/Navlinks";

const App = () => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-start h-full">
        <Navlinks />
        <Chatlist />
        <Chatbox />
        {/* <Login/> */}
        {/* <Register/> */}
      </div>
    </>
  );
};

export default App;
