import React from "react";
import { MdOutlineLogin } from "react-icons/md";

const Login = () => {
  return (
    <section className="login">
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
              className="auth-input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="auth-input-field"
            />
          </div>
          <button className="w-full text-[15px] text-white rounded-md font-medium flex items-center justify-center gap-2 p-3 bg-primary hover:cursor-pointer active:scale-98 transition-all duration-500 hover:shadow-lg">
            Login
            <MdOutlineLogin  className="text-[20px]" />
          </button>
          <div className="flex flex-row gap-2 mt-4">
            <p className="text-[15px] text-gray-400">
              Don't have an account?
            </p>
            <button className="font-semibold text-primary hover:cursor-pointer">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
