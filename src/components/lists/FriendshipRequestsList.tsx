import { Friendship, FriendshipRequest } from "@/types";
import {
  CustomButton,
  UserAvatar,
  ErrorMessage,
  EmptySection,
} from "@/components";
import { useFriendshipsCrud, useFriendshipRequestsCrud } from "@/hooks";
import { useAuthContext } from "@/context";
import { useEffect, useMemo } from "react";

export const FriendshipRequestList = () => {
  const { user } = useAuthContext();
  const { postFriendship } = useFriendshipsCrud();
  const {
    friendshipRequests,
    deleteFriendshipRequest,
    fetchFriendshipRequests,
    loading,
    error,
  } = useFriendshipRequestsCrud();

  useEffect(() => {
    fetchFriendshipRequests();
  }, [fetchFriendshipRequests]);

  const acceptRequest = async (request: FriendshipRequest) => {
    const data = { from: request.from, to: user.id } as Friendship;
    await postFriendship(data);
    deleteRequest(request.id);
  };

  const deleteRequest = async (id: string) => {
    await deleteFriendshipRequest(id);
    fetchFriendshipRequests();
  };

  const requestsFiltered = useMemo(() => {
    return friendshipRequests.filter((e) => e.from !== user.id);
  }, [friendshipRequests, user.id]);

  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center text-xs">
        loading...
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <ul>
      {requestsFiltered.length ? (
        requestsFiltered.map((request) => {
          return (
            <li key={request.id}>
              <div className="flex gap-2 p-2 items-center">
                <UserAvatar size="sm" userProfile={request.user_profile} />

                <div className="flex flex-col gap-2">
                  <span className="text-sm">
                    {request.user_profile.username}
                  </span>

                  <div className="flex gap-2">
                    <CustomButton
                      onClick={() => acceptRequest(request)}
                      size="sm"
                      label="Aceptar"
                    />
                    <CustomButton
                      onClick={() => deleteRequest(request.id)}
                      size="sm"
                      color="danger"
                      label="Rechazar"
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <div className="h-40 flex items-center justify-center">
          <EmptySection />
        </div>
      )}
    </ul>
  );
};
