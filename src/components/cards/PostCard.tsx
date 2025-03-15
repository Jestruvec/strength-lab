import { CustomMenu, UserAvatar } from "@/components";
import { Post } from "@/types";
import {
  FaEllipsisV,
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaPencilAlt,
} from "react-icons/fa";

interface ComponentProps {
  post: Post;
}

export const PostCard = ({ post }: ComponentProps) => {
  return (
    <div className="flex gap-2 border rounded-md border-dashed p-2 border-gray-400">
      <UserAvatar userProfile={post.user_profile} />

      <div className="flex-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">
              {`${post.user_profile.username} dice:`}
            </h2>

            <CustomMenu
              icon={<FaEllipsisV />}
              title=""
              content={
                <div className="flex flex-col gap-2 overflow-hidden">
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-1">
                    <FaTrash color="red" className="h-3 w-3" />
                    <span className="text-xs">Eliminar</span>
                  </div>
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-1">
                    <FaPencilAlt className="text-gray-700 h-3 w-3" />
                    <span className="text-xs">Editar</span>
                  </div>
                </div>
              }
            />
          </div>

          <span className="text-sm">{post.text}</span>
        </div>

        <div className="flex gap-2 justify-end">
          <FaThumbsUp className="h-3 w-3 text-gray-700" />
          <FaThumbsDown className="h-3 w-3 text-gray-700" />
        </div>
      </div>
    </div>
  );
};
