import React, { useEffect, useState } from "react";
import AvatarImage from "./UserPicture";
import SearchModal from "./SearchModal";
import { formatDate, formatTime, listenForChats } from "../firebase/firebase";

const Chatlist = ({ loginUser, selectedUser, setSelectedUser }) => {
  const [chatsData, setChatsData] = useState([]);

  useEffect(() => {
    const unsubscribe = listenForChats(setChatsData);
    return () => unsubscribe();
  }, []);

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

      <section className="relative bg-white lg:flex flex-col items-start justify-start w-full h-screen lg:w-[42%] lg:border-r border-gray-200">
        <header className="border-b border-gray-200 w-full px-4 py-4 flex flex-row justify-between">
          <div className="flex flex-row gap-3 items-center">
            <AvatarImage imageUrl={loginUser.image} />
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
          {chatsData.map((chat, index) => {
            const otherUser = chat.users.find((user => user.email !== loginUser.email));
            return (
              <div
                key={index}
                onClick={() => startChat(otherUser)}
                className={`w-full flex flex-row justify-between items-center hover:cursor-pointer ${
                  chatsData.length - 1 === index ? "border-b-0" : "border-b"
                } border-gray-200 px-5 py-2 mb-2 ${otherUser?.email === selectedUser?.email? 'bg-primary/10':''}`}
              >
                <div className="flex flex-row gap-3 items-center">
                  <AvatarImage imageUrl={otherUser.image}/>
                  <div>
                    <h1 className="font-medium text-[15px] overflow-hidden text-ellipsis text-nowrap w-[180px]">
                      {otherUser.fullName}
                    </h1>
                    <p className="text-gray-500 text-[13px]">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <p className="text-gray-500 text-[10px]">
                    {formatDate(chat.lastMessageTimestamp)}
                  </p>
                  <p className="text-gray-500 text-[10px]">
                    {formatTime(chat.lastMessageTimestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Chatlist;
