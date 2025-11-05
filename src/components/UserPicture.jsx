import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const AvatarImage = ({ imageUrl, size = 40 }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="flex items-center justify-center rounded-full bg-gray-100 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt="User avatar"
          className="w-full h-full object-cover rounded-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <FaUserCircle
          className="text-gray-400"
          style={{ fontSize: size * 0.9 }}
        />
      )}
    </div>
  );
};

export default AvatarImage;
