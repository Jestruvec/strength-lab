import { useMemo, useEffect, useState } from "react";
import { FriendshipSuggestionCard } from "../molecules/FriendshipSuggestionCard";
import {
  useFriendshipRequestsCrud,
  useFriendshipsCrud,
  useUserProfileCrud,
} from "@/hooks";
import { useAuthContext } from "@/context";
import { FriendshipRequest } from "@/types";
import { ErrorMessage } from "../atoms/ErrorMessage";

export const FriendshipSuggestList = () => {
  const { user } = useAuthContext();
  const { profiles, fetchProfiles } = useUserProfileCrud();
  const { friendships, fetchFriendships } = useFriendshipsCrud();
  const {
    friendshipRequests,
    loading,
    error,
    fetchFriendshipRequests,
    postFriendshipRequest,
    deleteFriendshipRequest,
  } = useFriendshipRequestsCrud();

  const [requestsSent, setRequestsSent] = useState<FriendshipRequest[]>([]);

  useEffect(() => {
    fetchProfiles();
    fetchFriendships();
    fetchFriendshipRequests();
  }, [fetchProfiles, fetchFriendships, fetchFriendshipRequests]);

  const nonFriendProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      return (
        profile.id !== user.id &&
        !friendships.some(
          (request) =>
            (request.from === user.id && request.to === profile.id) ||
            (request.from === profile.id && request.to === user.id)
        ) &&
        !friendshipRequests.some(
          (request) =>
            (request.from === user.id && request.to === profile.id) ||
            (request.from === profile.id && request.to === user.id)
        )
      );
    });
  }, [profiles, friendshipRequests, friendships, user.id]);

  const handlePostRequest = async (to: string) => {
    const data = {
      from: user.id,
      to,
    } as FriendshipRequest;

    const request = await postFriendshipRequest(data);
    setRequestsSent([...requestsSent, request]);
  };

  const handleDeleteRequest = async (requestId: string) => {
    await deleteFriendshipRequest(requestId);
    setRequestsSent((oldValue) => oldValue.filter((e) => e.id !== requestId));
  };

  const getRequest = (profileId: string) => {
    const request = requestsSent.find((request) => request.to === profileId);
    return request;
  };

  if (loading) {
    return <div className="h-40">loading...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="h-40">
      <h1 className="text-2xl font-bold">Agregar amigos</h1>

      <div className="flex items-center gap-2 mb-3 py-4 overflow-x-auto overflow-y-hidden">
        {nonFriendProfiles.map((profile) => (
          <FriendshipSuggestionCard
            key={profile.id}
            userProfile={profile}
            friendshipRequest={getRequest(profile.id)}
            onRequestSent={handlePostRequest}
            onRequestDelete={handleDeleteRequest}
          />
        ))}
      </div>
    </div>
  );
};
