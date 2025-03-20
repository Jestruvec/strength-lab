import { useEffect } from "react";
import { PostForm, PostCard, EmptySection, ErrorMessage } from "@/components";
import { useAuthContext } from "@/context";
import { ReactionTypesEnum } from "@/enums";
import { usePostsCrud, useReactionsCrud } from "@/hooks";
import { Post, Reaction } from "@/types";

export const PostList = () => {
  const { user } = useAuthContext();
  const { posts, loading, error, fetchPosts, deletePost, putPost } =
    usePostsCrud();
  const { postReaction, deleteReaction, putReaction } = useReactionsCrud();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
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
    </>
  );
};
