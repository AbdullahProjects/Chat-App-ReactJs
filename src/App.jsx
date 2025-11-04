import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Chatlist from "./components/Chatlist";
import Chatbox from "./components/Chatbox";
import Navlinks from "./components/Navlinks";
import { auth } from "./firebase/firebase";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe;
  }, []);

  return (
    <>
      <div>
        {user ? (
          <div className="w-full flex flex-col lg:flex-row items-start h-full">
            <Navlinks />
            <Chatlist />
            <Chatbox />
          </div>
        ) : (
          <div>
            {isLogin ? (
              <Login isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Register isLogin={isLogin} setIsLogin={setIsLogin} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
