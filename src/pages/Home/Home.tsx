import { useEffect, useMemo } from "react";
import {
  useFriendshipRequestsCrud,
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
import { Post, Reaction } from "@/types";
import { ReactionTypesEnum } from "@/enums";

export const Home = () => {
  const { user } = useAuthContext();
  const { fetchProfiles, profiles } = useUserProfileCrud();
  const { postReaction, putReaction, deleteReaction } = useReactionsCrud();
  const { fetchPosts, posts, deletePost, putPost } = usePostsCrud();
  const { fetchFriendshipRequests, friendshipRequests, loading, error } =
    useFriendshipRequestsCrud();

  useEffect(() => {
    fetchProfiles();
    fetchPosts();
    fetchFriendshipRequests();
  }, [fetchProfiles, fetchFriendshipRequests, fetchPosts]);

  const nonFriendProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      return (
        profile.id !== user.id &&
        !friendshipRequests.some(
          (request) =>
            (request.from === user.id && request.to === profile.id) ||
            (request.from === profile.id && request.to === user.id)
        )
      );
    });
  }, [profiles, friendshipRequests, user.id]);

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
    await putPost(id, data);

    fetchPosts();
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
            {nonFriendProfiles.map((profile) => (
              <FriendshipRequestCard key={profile.id} userProfile={profile} />
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
