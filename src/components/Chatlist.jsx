import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchModal from "./SearchModal";
import AvatarImage from "./UserPicture";

const Chatlist = ({ loginUser, setSelectedUser }) => {
  const [chatsData, setChatsData] = useState([
    "Abdullah Khan",
    "Ali Haider",
    "Sara Ahmed",
    "Bilal Hussain",
    "Fatima Noor",
    "Hamza Malik",
    "Ayesha Khan",
    "Usman Raza",
    "Zainab Iqbal",
    "Omar Farooq",
    "Hassan Shah",
    "Maria Javed",
    "Daniyal Ahmed",
    "Sana Tariq",
    "Ahmad Rauf",
    "Laiba Fatima",
    "Rehan Ali",
    "Mehak Zafar",
    "Nimra Yousaf",
    "Taha Siddiqui",
  ]);

  const startChat = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <style>{`
  .custom-scroll::-webkit-scrollbar:horizontal {
    display: none;
  }

  /* Style the vertical scrollbar */
  .custom-scroll::-webkit-scrollbar {
    width: 0px;
  }

  .custom-scroll::-webkit-scrollbar-track {
    background: #01aa8510;
    border-radius: 10px;
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    background: #01aa8540;
    border-radius: 10px;
  }

  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`}</style>

      <section className="relative bg-white lg:flex flex-col items-start justify-start w-full h-screen lg:w-[35%] lg:border-r border-gray-200">
        <header className="border-b border-gray-200 w-full px-4 py-4 flex flex-row justify-between">
          <div className="flex flex-row gap-3 items-center">
            <AvatarImage imageUrl={loginUser.image}/>
            <div>
              <h1 className="font-semibold text-[16px]">
                {loginUser.fullName}
              </h1>
              <p className="text-gray-500 text-[14px]">{loginUser.email}</p>
            </div>
          </div>
          {/* <div className="text-primary/90 px-2 py-1 max-h-10 rounded-md bg-primary/10 flex items-center justify-center hover:cursor-pointer">
            <BsThreeDotsVertical />
          </div> */}
        </header>
        <div className="flex flex-row items-center justify-between w-full p-4">
          <p className="text-[14px] text-gray-600 font-medium">Messages (1)</p>
          <SearchModal startChat={startChat} />
        </div>
        <section className="custom-scroll w-full h-screen overflow-scroll">
          {chatsData.map((chat, index) => (
            <div
              key={index}
              className={`w-full flex flex-row justify-between items-center ${
                chatsData.length - 1 === index ? "border-b-0" : "border-b"
              } border-gray-200 px-5 py-2 mb-2`}
            >
              <div className="flex flex-row gap-3 items-center">
                <CgProfile className="text-[25px] text-black" />
                <div>
                  <h1 className="font-medium text-[15px]">{chat}</h1>
                  <p className="text-gray-500 text-[13px]">How are you?</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <p className="text-gray-500 text-[10px]">13 February, 2025</p>
                <p className="text-gray-500 text-[10px]">1:30 PM</p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};

export default Chatlist;
