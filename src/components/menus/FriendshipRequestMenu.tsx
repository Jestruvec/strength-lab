import { useEffect, useMemo, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useFriendshipRequestsCrud } from "@/hooks";
import {
  FriendshipRequestList,
  EmptySection,
  ErrorMessage,
} from "@/components";
import { useAuthContext } from "@/context";

export const FriendshipRequestMenu = () => {
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  const { friendshipRequests, fetchFriendshipRequests, loading, error } =
    useFriendshipRequestsCrud();

  useEffect(() => {
    fetchFriendshipRequests();
  }, [fetchFriendshipRequests]);

  const requestsFiltered = useMemo(() => {
    return friendshipRequests.filter((e) => e.from !== user.id);
  }, [friendshipRequests, user.id]);

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
    <div className="relative">
      <button onClick={toggleFriendshipRequestMenu} className="cursor-pointer">
        <FaUserFriends className="h-4 w-4" />
      </button>

      {showMenu && (
        <div className="absolute p-2 overflow-hidden shadow-md rounded-md w-44 text-black bg-white top-6 right-0">
          <h1 className="text-sm font-bold ">Solicitudes de amistad</h1>

          {requestsFiltered.length ? (
            <FriendshipRequestList friendshipRequests={requestsFiltered} />
          ) : (
            <div className="h-20 flex items-center">
              <EmptySection />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
