import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useFriendshipRequestsCrud } from "@/hooks";
import {
  FriendshipRequestList,
  EmptySection,
  ErrorMessage,
} from "@/components";

export const FriendshipRequestMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { friendshipRequests, fetchFriendshipRequests, loading, error } =
    useFriendshipRequestsCrud();

  useEffect(() => {
    fetchFriendshipRequests();
  }, [fetchFriendshipRequests]);

  const toggleFriendshipRequestMenu = () => {
    setShowMenu(!showMenu);
  };

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <button
      onClick={toggleFriendshipRequestMenu}
      className="cursor-pointer relative"
    >
      <FaUserFriends className="h-4 w-4" />

      {showMenu && (
        <div className="absolute p-2 overflow-hidden shadow-md rounded-md w-44 text-black bg-white top-6 right-0">
          <h1 className="text-sm font-bold ">Solicitudes de amistad</h1>

          {friendshipRequests.length ? (
            <FriendshipRequestList friendshipRequests={friendshipRequests} />
          ) : (
            <div className="h-20 flex items-center">
              <EmptySection />
            </div>
          )}
        </div>
      )}
    </button>
  );
};
