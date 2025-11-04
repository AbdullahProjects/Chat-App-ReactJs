import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

const SearchModal = () => {
  const [showSearchModal, setSearchModal] = useState(false);

  return (
    <>
      <style>{`
  .search-modal-scroll::-webkit-scrollbar:horizontal {
    display: none;
  }

  /* Style the vertical scrollbar */
  .search-modal-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .search-modal-scroll::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
  }

  .search-modal-scroll::-webkit-scrollbar-thumb {
    background: #01aa8580;
    border-radius: 10px;
  }

  .search-modal-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`}</style>

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
              <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-white/80">
                <h1 className="text-[18px] font-semibold text-white">
                  Search Chat
                </h1>
                <IoMdClose
                  className="text-white text-[20px] hover:cursor-pointer"
                  onClick={() => setSearchModal(false)}
                />
              </div>
              <div className="px-5 py-4 flex flex-col gap-5">
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
                <div className="search-modal-scroll flex flex-col gap-2 max-h-[40vh] overflow-scroll">
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                  <FindUserContainer />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const FindUserContainer = () => {
  return (
    <div className="flex flex-row gap-3 bg-white/10 rounded-md items-center px-4 py-2 hover:cursor-pointer hover:bg-white/20">
      <CgProfile className="text-[25px] text-white" />
      <div>
        <h1 className="font-semibold text-white text-[15px]">Abdullah Khan</h1>
        <p className="text-white/80 text-[14px]">abdullah.kakar@gmail.com</p>
      </div>
    </div>
  );
};

export default SearchModal;
