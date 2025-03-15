import { UserAvatar } from "@/components";
import { Post } from "@/types";

interface ComponentProps {
  post: Post;
}

export const PostCard = ({ post }: ComponentProps) => {
  return (
    <div className="flex gap-2 border rounded-md border-dashed p-2 border-gray-400">
      <UserAvatar userProfile={post.user_profile} />
      <h2 className="text-sm font-bold">
        {`${post.user_profile.username} dice:`}
      </h2>
      <span className="text-sm">{post.text}</span>
    </div>
  );
};
