import { useEffect, useMemo } from "react";
import {
  useFriendshipRequestsCrud,
  useUserProfileCrud,
  usePostsCrud,
} from "@/hooks";
import {
  EmptySection,
  FriendshipRequestCard,
  PostCard,
  PostForm,
} from "@/components";
import { useAuthContext } from "@/context";

export const Home = () => {
  const { user } = useAuthContext();
  const { fetchProfiles, profiles } = useUserProfileCrud();
  const { fetchPosts, posts } = usePostsCrud();
  const { fetchFriendshipRequests, friendshipRequests, loading, error } =
    useFriendshipRequestsCrud();

  useEffect(() => {
    fetchProfiles();
    fetchPosts();
    fetchFriendshipRequests();
  }, [fetchProfiles, fetchFriendshipRequests, fetchPosts]);

  const nonFriendProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      return !friendshipRequests.some(
        (request) => request.from === user.id && request.to === profile.id
      );
    });
  }, [profiles, friendshipRequests, user.id]);

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
              return <PostCard post={post} />;
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
