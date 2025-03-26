import { useFriendshipsCrud } from "@/hooks";
import { useEffect, useMemo } from "react";
import { ErrorMessage } from "../errors/ErrorMessage";
import { UserProfile } from "@/types";
import { useAuthContext } from "@/context";
import { UserAvatar } from "../avatar/UserAvatar";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { EmptySection } from "../EmptySection/EmptySection";

interface UserProfileExtended extends UserProfile {
  friendshipId: string;
}

export const FriendshipsList = () => {
  const { user } = useAuthContext();
  const { loading, error, friendships, fetchFriendships, deleteFriendship } =
    useFriendshipsCrud();

  useEffect(() => {
    fetchFriendships();
  }, [fetchFriendships]);

  const friendUserProfiles = useMemo(() => {
    return friendships.reduce((acc, friendship) => {
      if (friendship.from_user.id !== user.id) {
        acc.push({ ...friendship.from_user, friendshipId: friendship.id });
      } else {
        acc.push({ ...friendship.to_user, friendshipId: friendship.id });
      }
      return acc;
    }, [] as UserProfileExtended[]);
  }, [friendships, user.id]);

  const handleDeleteFriendship = async (
    event: React.MouseEvent,
    id: string
  ) => {
    event.stopPropagation();

    await deleteFriendship(id);
    fetchFriendships();
  };

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Lista de amigos</h1>

      {friendUserProfiles.length ? (
        <ul>
          {friendUserProfiles.map((friend) => {
            return (
              <Link
                key={friend.id}
                to={`/profile/${friend.id}`}
                className="w-100"
              >
                <li className="cursor-pointer hover:bg-gray-200 p-1">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <UserAvatar userProfile={friend} />
                      <h3>{friend.username}</h3>
                    </div>

                    <button
                      className="cursor-pointer hover:opacity-50"
                      onClick={(event) =>
                        handleDeleteFriendship(event, friend.friendshipId)
                      }
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <div className="h-40 flex justify-center items-center">
          <EmptySection />
        </div>
      )}
    </>
  );
};
