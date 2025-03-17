import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FriendshipRequestList } from "@/components";

export const FriendshipRequestMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleFriendshipRequestMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <button onClick={toggleFriendshipRequestMenu} className="cursor-pointer">
        <FaUserFriends className="h-4 w-4" />
      </button>

      {showMenu && (
        <div className="absolute p-2 overflow-hidden shadow-md rounded-md w-48 text-black bg-white top-6 right-0">
          <h1 className="text-sm font-bold ">Solicitudes de amistad</h1>
          <FriendshipRequestList />
        </div>
      )}
    </div>
  );
};
