import { useMemo, useEffect, useState } from "react";
import { FriendshipRequestCard } from "../cards/FriendshipRequestCard";
import {
  useFriendshipRequestsCrud,
  useFriendshipsCrud,
  useUserProfileCrud,
} from "@/hooks";
import { useAuthContext } from "@/context";
import { FriendshipRequest } from "@/types";
import { ErrorMessage } from "../errors/ErrorMessage";

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

  const [requestSent, setRequestSent] = useState<Record<number, string>>({});

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

  const handlePostRequest = async (to: string, idx: number) => {
    const data = {
      from: user.id,
      to,
    } as FriendshipRequest;

    const request = await postFriendshipRequest(data);
    setRequestSent({ ...requestSent, [idx]: request.id });
  };

  const handleDeleteRequest = async (index: number) => {
    const requestId = requestSent[index];
    await deleteFriendshipRequest(requestId);

    setRequestSent((prev) => {
      const newState = { ...prev };
      delete newState[0];
      return newState;
    });
  };

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Agregar amigos</h1>

      <div className="flex items-center gap-2 mb-3 py-4 overflow-x-auto overflow-y-hidden">
        {nonFriendProfiles.map((profile, idx) => (
          <FriendshipRequestCard
            key={profile.id}
            userProfile={profile}
            onRequestSent={(to: string) => handlePostRequest(to, idx)}
            onRequestDelete={() => handleDeleteRequest(idx)}
          />
        ))}
      </div>
    </>
  );
};
