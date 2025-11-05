import React, { useEffect, useRef, useState } from "react";
import { IoMdLock } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosSend } from "react-icons/io";
import AvatarImage from "./UserPicture";
import { auth, formatDate, formatTime, listendForMessages, sendMessage } from "../firebase/firebase";

const Chatbox = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const scrollRef = useRef(null);

  const chatId =
    auth.currentUser?.uid < selectedUser?.uid
      ? `${auth.currentUser?.uid}-${selectedUser?.uid}`
      : `${selectedUser?.uid}-${auth.currentUser?.uid}`;
  const user1 = auth.currentUser?.uid;
  const user2 = selectedUser?.uid;
  const senderEmail = auth.currentUser?.email;

  useEffect(() => {
    listendForMessages(chatId, (messages) => {
      // Sort messages by timestamp (oldest first, newest last)
      const sortedMessages = [...messages].sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeA - timeB;
      });
      setChatMessages(sortedMessages);
    });
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = message;
    setMessage("");

    const newMessage = {
      sender: "email",
      text: messageText,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    };
    await sendMessage(messageText, chatId, user1, user2, selectedUser);
    setChatMessages((prevChatMessages) => [...prevChatMessages, newMessage]);
  };

  return (
    <>
      <style>{`
  .scroll::-webkit-scrollbar:horizontal {
    display: none;
  }

  /* Style the vertical scrollbar */
  .scroll::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  .scroll::-webkit-scrollbar-track {
    background: #01aa8515;
    border-radius: 10px;
  }

  .scroll::-webkit-scrollbar-thumb {
    background: #01aa85;
    border-radius: 10px;
  }

  .scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`}</style>

      <section className="hidden lg:flex w-full h-screen">
        {selectedUser == null ? (
          <BeforeChat />
        ) : (
          <div className="w-full bg-primary/5">
            {/* Header with user info */}
            <header className="w-full h-[10vh] px-4 py-2 flex items-center bg-white border-b border-gray-200">
              <div className="flex flex-row gap-3 items-center">
                <AvatarImage imageUrl={selectedUser?.image} />
                <div>
                  <h1 className="font-semibold text-[16px]">
                    {selectedUser?.fullName || "Name"}
                  </h1>
                  <p className="text-gray-500 text-[14px]">
                    {selectedUser?.email || "Email"}
                  </p>
                </div>
              </div>
            </header>
            {/* Messages */}
            <div
              ref={scrollRef}
              className="scroll overflow-scroll h-[80vh] px-10 py-4 flex flex-col"
            >
              {chatMessages.map((msg, index) =>
                msg.sender === senderEmail ? (
                  <ReceiverMessage key={index} data={msg}/>
                ) : (
                  <SenderMessage key={index} data={msg} selectedUser={selectedUser}/>
                )
              )}
            </div>
            {/* Send Message */}
            <form onSubmit={handleSendMessage}>
              <div className="h-[10vh] bg-white w-full px-6 py-2 flex flex-row items-center gap-10">
                <input
                  type="text"
                  placeholder="Type message..."
                  className="w-full outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary rounded-full p-2 hover:cursor-pointer"
                >
                  <IoIosSend className="text-[20px] text-white" />
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};


const SenderMessage = ({data, selectedUser}) => {
  return (
    <div className="sender-message flex flex-col items-start gap-3 my-1">
      <div className="flex flex-row items-start gap-2.5 w-full">
        <AvatarImage imageUrl={selectedUser?.image}/>
        <div className="bg-white flex items-center justify-center rounded-md px-4 py-2 shadow-sm max-w-[60%]">
          {data.text}
        </div>
        <p className="text-gray-500 text-[10px] self-center">
          {formatTime(data.timestamp)}
        </p>
      </div>
      <p className="text-gray-500 text-[10px]">{formatDate(data.timestamp)}</p>
    </div>
  );
};

const ReceiverMessage = ({data}) => {
  return (
    <div className="reveiver-message flex flex-col items-start gap-3 self-end w-[60%] my-1">
      <div className="flex flex-row gap-2 w-full items-start justify-end">
        <p className="text-gray-500 text-[10px] self-center">
          {formatDate(data.timestamp)}
        </p>
        <div className="bg-white flex items-center justify-center rounded-md px-4 py-2 shadow-sm">
          {data.text}
        </div>
      </div>
      <p className="text-gray-500 text-[10px] self-end">{formatTime(data.timestamp)}</p>
    </div>
  );
};

const BeforeChat = () => {
  return (
    <>
      <div className="before-chat w-full h-full bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-center relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-r from-black/10 to-black/10"></div>

        <div className="flex items-center flex-col z-10">
          <h1 className="text-primary font-bold text-[30px]">Chat</h1>
          <p className="text-[16px] text-gray-600 pt-1">Start Chatting Now</p>
          <div className="flex gap-1.5 items-center absolute bottom-10">
            <IoMdLock className="text-gray-600" />
            <p className="text-[14px] text-gray-500">
              Your personal messages are end-to-end encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
