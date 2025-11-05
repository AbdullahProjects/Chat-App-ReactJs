import React, { Fragment } from "react";
import { RiChatAiLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Navlinks = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log("Error while logout user: " + e);
    }
  };

  return (
    <Fragment>
      <style>
        {`
        .nav-list-item{
        font-size: 22px;
        color: white;
        }
        .nav-list-item:hover{
        cursor:pointer;
        }
        `}
      </style>
      <section className="sticky lg:static top-0 flex items-center lg:items-start lg:justify-center bg-primary w-full h-[70px] lg:w-[100px] lg:h-screen py-8">
        <main className="flex flex-row lg:flex-col items-center justify-between w-full lg:gap-10 px-4">
          <div>
            <h1 className="text-white font-bold text-[22px]">Chat</h1>
          </div>

          <ul className="flex flex-row lg:flex-col items-center gap-8">
            <button>
              <RiChatAiLine className="nav-list-item" />
            </button>
            {/* <button>
              <RiContactsBook3Line className="nav-list-item" />
            </button>
            <button>
              <MdOutlineNotificationsActive className="nav-list-item" />
            </button> */}
            <button onClick={handleSignOut}>
              <RiLogoutCircleRLine className="nav-list-item" />
            </button>
          </ul>
        </main>
      </section>
    </Fragment>
  );
};

export default Navlinks;
