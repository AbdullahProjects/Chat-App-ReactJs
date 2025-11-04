import React from "react";
import { IoMdLock } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosSend } from "react-icons/io";

const Chatbox = () => {
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

      <section className="hidden lg:flex w-full">
        {/* <BeforeChat /> */}
        <div className="w-full bg-primary/5">
          {/* Header with user info */}
          <header className="w-full h-[10vh] px-4 py-2 flex items-center bg-white border-b border-gray-200">
            <div className="flex flex-row gap-3 items-center">
              <CgProfile className="text-[25px] text-black" />
              <div>
                <h1 className="font-semibold text-[16px]">Abdullah Khan</h1>
                <p className="text-gray-500 text-[14px]">
                  abdullah.kakar@gmail.com
                </p>
              </div>
            </div>
          </header>
          {/* Messages */}
          <div className="scroll overflow-scroll h-[80vh] px-4 py-4 flex flex-col">
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
          </div>
          {/* Send Message */}
          <div className="h-[10vh] bg-white w-full px-6 py-2 flex flex-row items-center gap-10">
            <input
              type="text"
              placeholder="Type message..."
              className="w-full outline-none"
            />
            <div className="bg-primary rounded-full p-2 hover:cursor-pointer">
              <IoIosSend className="text-[20px] text-white"/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const SenderMessage = () => {
  return (
    <div className="sender-message flex flex-col items-start gap-3 my-1">
      <div className="flex flex-row items-start gap-2.5 w-full">
        <CgProfile className="text-[25px] text-black" />
        <div className="bg-white flex items-center justify-center rounded-md px-4 py-2 shadow-sm max-w-[60%]">
          Ducimus magni, culpa nesciunt eaque, tempora non, amet dolorum neque
          aspernatur nobis voluptates? Harum vero sint odit excepturi vitae,
          quod mollitia cumque tempora corporis non quam nesciunt. Alias, nihil
          voluptas?
        </div>
        <p className="text-gray-500 text-[10px] self-center">
          13 February, 2025
        </p>
      </div>
      <p className="text-gray-500 text-[10px]">1:30 PM</p>
    </div>
  );
};

const ReceiverMessage = () => {
  return (
    <div className="reveiver-message flex flex-col items-start gap-3 self-end">
      <div className="flex flex-row gap-2 w-full items-start justify-end">
        <p className="text-gray-500 text-[10px] self-center">
          13 February, 2025
        </p>
        <div className="bg-white flex items-center justify-center rounded-md px-4 py-2 shadow-sm max-w-[60%]">
          How are you?
        </div>
      </div>
      <p className="text-gray-500 text-[10px] self-end">1:30 PM</p>
    </div>
  );
};

const BeforeChat = () => {
  return (
    <>
      <div className="before-chat w-full h-full bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-center relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-r from-black/10 to-black/10"></div>

        <div className="flex items-center flex-col z-50">
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
