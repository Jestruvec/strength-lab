import { useEffect, useMemo, useState } from "react";
import {
  useFriendshipRequestsCrud,
  useFriendshipsCrud,
  useUserProfileCrud,
  usePostsCrud,
  useReactionsCrud,
} from "@/hooks";
import {
  EmptySection,
  FriendshipRequestCard,
  PostCard,
  PostForm,
} from "@/components";
import { useAuthContext } from "@/context";
import { FriendshipRequest, Post, Reaction } from "@/types";
import { ReactionTypesEnum } from "@/enums";

export const Home = () => {
  const { user } = useAuthContext();
  const { fetchProfiles, profiles } = useUserProfileCrud();
  const { postReaction, putReaction, deleteReaction } = useReactionsCrud();
  const { friendships, fetchFriendships } = useFriendshipsCrud();
  const { postFriendshipRequest, deleteFriendshipRequest } =
    useFriendshipRequestsCrud();
  const { fetchPosts, posts, deletePost, putPost } = usePostsCrud();
  const { fetchFriendshipRequests, friendshipRequests, loading, error } =
    useFriendshipRequestsCrud();
  const [requestSent, setRequestSent] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchProfiles();
    fetchPosts();
    fetchFriendships();
    fetchFriendshipRequests();
  }, [fetchProfiles, fetchFriendshipRequests, fetchPosts, fetchFriendships]);

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

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
    fetchPosts();
  };

  const handleReact = async (
    post: Post,
    type: ReactionTypesEnum,
    removeReaction: boolean,
    reactionId?: string
  ) => {
    if (removeReaction && reactionId) {
      await deleteReaction(reactionId);
      return;
    }

    const { reactions } = post;

    const userReaction = reactions.find((e) => e.userId === user.id);
    const data = { postId: post.id, type, userId: user.id } as Reaction;

    if (userReaction) {
      await putReaction(userReaction.id, data);
    } else {
      await postReaction(data);
    }

    fetchPosts();
  };

  const handleEditPost = async (id: string, data: Post) => {
    delete data.user_profile;
    delete data.reactions;

    await putPost(id, data);

    fetchPosts();
  };

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
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  return (
    <>
      {nonFriendProfiles.length !== 0 && (
        <section>
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
        </section>
      )}

      <section>
        <h1 className="text-2xl font-bold">Posts</h1>

        <div className="py-4">
          <PostForm onPostPost={fetchPosts} />
        </div>

        <div className="flex flex-col gap-2">
          {posts.length ? (
            posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onReact={handleReact}
                  onDelete={handleDeletePost}
                  onEdit={handleEditPost}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center h-40">
              <EmptySection />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
