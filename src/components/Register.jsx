import React, { useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = ({ isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleUserChangeData = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuth = async (e) => {
    e.preventDefault(); // Prevent form default submission
    const { fullName, email, password } = userData;

    // Check if all fields have data (non-empty)
    if (fullName && email && password) {
      try {
        // Start Loading
        setLoading(true);

        // Authenticate User
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        // Storing user data in Firestore doc
        const userDocRef = doc(db, "user", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          fullName,
          email,
          image: "",
        });

        console.log("User registered successfully");
      } catch (e) {
        console.log("Error while registering user: " + e);
        alert(e);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <section className="register">
      <form onSubmit={handleAuth}>
        <div className="flex justify-center items-center h-screen bg-primary/20">
          <div className="bg-white px-6 py-12 shadow-lg rounded-xl w-100 flex flex-col items-center justify-center">
            <div className="mb-8">
              <h1 className="font-bold text-[25px] text-center">Register</h1>
              <p className="text-gray-400 text-[15px]">
                Welcome, create an account to continue
              </p>
            </div>
            <div className="w-full flex flex-col gap-3 mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                className="auth-input-field"
                onChange={handleUserChangeData}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="auth-input-field"
                onChange={handleUserChangeData}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="auth-input-field"
                onChange={handleUserChangeData}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full disabled:bg-gray-300 disabled:text-black/40 text-[15px] text-white rounded-md font-medium flex items-center justify-center gap-2 p-3 bg-primary hover:cursor-pointer active:scale-98 transition-all duration-500 hover:shadow-lg disabled:cursor-not-allowed"
            >
              {loading ? <p>Loading...</p> : <p>Register</p>}
              {loading ? <></> : <TiUserAdd className="text-[20px]" />}
            </button>
            <div className="flex flex-row gap-2 mt-4">
              <p className="text-[15px] text-gray-400">
                Already have an account?
              </p>
              <button
                className="font-semibold text-primary hover:cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
