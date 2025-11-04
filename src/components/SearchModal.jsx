import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const SearchModal = () => {
  const [showSearchModal, setSearchModal] = useState(false);

  return (
    <div>
      <button className="w-[30px] h-[30px] bg-primary/10 flex items-center justify-center rounded-md">
        <IoSearchOutline
          onClick={() => setSearchModal(true)}
          className="text-[18px] text-primary/90 hover:cursor-pointer object-contain"
        />
      </button>

      {showSearchModal ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30">
          <div className="bg-primary w-[30%] flex flex-col rounded-md">
            <div className="flex flex-row items-center justify-between px-6 py-3 border-b border-white/80">
              <h1 className="text-[18px] font-semibold text-white">
                Search Chat
              </h1>
              <IoMdClose
                className="text-white text-[20px] hover:cursor-pointer"
                onClick={() => setSearchModal(false)}
              />
            </div>
            <div className="px-5 py-4">
              <div className="flex flex-row gap-2 items-center">
                <input
                  type="text"
                  placeholder="Enter username"
                  className="outline-none w-full bg-white py-2.5 px-4 rounded-md"
                />
                <div className="bg-white p-2.5 flex items-center justify-center rounded-full hover:cursor-pointer">
                  <IoSearchOutline className="text-[18px] text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchModal;
