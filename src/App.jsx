import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Chatlist from "./components/Chatlist";
import Chatbox from "./components/Chatbox";
import Navlinks from "./components/Navlinks";
import { auth, db } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  // const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async (authUser) => {
      if (authUser) {
        try {
          // Fetch user document from Firestore
          const userDocRef = doc(db, "user", authUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Combine auth user data with Firestore user data
            const userData = {
              ...authUser,
              ...userDocSnap.data(),
            };
            setUser(userData);
            console.log("User data from Firestore: ", userData);
          } else {
            // If document doesn't exist, just use auth user
            setUser(authUser);
            console.log("User document not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
    };

    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchUserData(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      fetchUserData(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        {user ? (
          <div className="w-full flex flex-col lg:flex-row items-start h-full">
            <Navlinks selectedUser={selectedUser} />
            <Chatlist loginUser={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <Chatbox selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
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
