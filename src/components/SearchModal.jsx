import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchModal = () => {
  return (
    <div>
      <button className="w-[30px] h-[30px] bg-primary/10 flex items-center justify-center rounded-md">
        <IoSearchOutline className="text-[18px] text-primary/90 hover:cursor-pointer object-contain" />
      </button>
    </div>
  );
};

export default SearchModal;
