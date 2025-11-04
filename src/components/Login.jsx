import React, { useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = ({ isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleUserChangeData = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    // Check if all fields have data (non-empty)
    if (email && password) {
      try {
        // Start Loading
        setLoading(true);

        // Authenticate User
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User loggined successfully");
      } catch (e) {
        console.log("Error while login user: " + e);
        alert(e);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <section className="login">
      <form onSubmit={handleAuth}>
        <div className="flex justify-center items-center h-screen bg-primary/20">
          <div className="bg-white px-6 py-12 shadow-lg rounded-xl w-100 flex flex-col items-center justify-center">
            <div className="mb-8">
              <h1 className="font-bold text-[25px] text-center">Sign In</h1>
              <p className="text-gray-400 text-[15px]">
                Welcome back, login to continue
              </p>
            </div>
            <div className="w-full flex flex-col gap-3 mb-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
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
              className="w-full disabled:bg-gray-300 disabled:text-black/40 text-[15px] text-white rounded-md font-medium flex items-center justify-center gap-2 p-3 bg-primary hover:cursor-pointer active:scale-98 transition-all duration-500 hover:shadow-lg"
            >
              {loading ? <p>Loading...</p> : <p>Login</p>}
              {loading ? <></> : <MdOutlineLogin className="text-[20px]" />}
            </button>
            <div className="flex flex-row gap-2 mt-4">
              <p className="text-[15px] text-gray-400">
                Don't have an account?
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-primary hover:cursor-pointer"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
