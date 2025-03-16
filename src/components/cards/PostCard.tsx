import { useState } from "react";
import { UserAvatar } from "@/components";
import { useAuthContext } from "@/context";
import { Post } from "@/types";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaPencilAlt,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { ReactionTypesEnum } from "@/enums";

interface ComponentProps {
  post: Post;
  onDelete: (id: string) => void;
  onReact: (
    post: Post,
    type: ReactionTypesEnum,
    deleteReaction: boolean,
    reactionId?: string
  ) => void;
  onEdit: (id: string, postText: Post) => void;
}

export const PostCard = ({
  post,
  onDelete,
  onEdit,
  onReact,
}: ComponentProps) => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(post.text);

  const getReactions = (): React.ReactNode => {
    const { reactions } = post;
    const userReaction = reactions.find((e) => e.userId === user.id);
    const isLike = userReaction?.type === ReactionTypesEnum.like;
    const isDislike = userReaction?.type === ReactionTypesEnum.dislike;

    return (
      <>
        <button
          onClick={() =>
            handleReact(ReactionTypesEnum.like, isLike, userReaction?.id)
          }
        >
          <FaThumbsUp
            className={`h-3 w-3 cursor-pointer hover:opacity-50 ${
              isLike ? "text-blue-500" : "text-gray-700"
            }`}
          />
        </button>
        <button
          onClick={() =>
            handleReact(ReactionTypesEnum.dislike, isDislike, userReaction?.id)
          }
        >
          <FaThumbsDown
            className={`h-3 w-3 cursor-pointer hover:opacity-50 ${
              isDislike ? "text-blue-500" : "text-gray-700"
            }`}
          />
        </button>
      </>
    );
  };

  const handleReact = (
    type: ReactionTypesEnum,
    deleteReaction: boolean,
    reactionId?: string
  ) => {
    onReact(post, type, deleteReaction, reactionId);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewText(post.text);
  };

  const handleSaveEdit = () => {
    if (newText.trim() !== post.text) {
      onEdit(post.id, { ...post, text: newText });
    }

    setIsEditing(false);
  };

  return (
    <div className="flex gap-2 border rounded-md border-dashed p-2 border-gray-400">
      <UserAvatar userProfile={post.user_profile} />

      <div className="flex-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">
              {`${post.user_profile.username} dice:`}
            </h2>

            {post.user_id === user.id && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <FaCheck
                      className="text-green-700 h-3 w-3 cursor-pointer hover:opacity-50"
                      onClick={handleSaveEdit}
                    />
                    <FaTimes
                      color="red"
                      className="h-3 w-3 cursor-pointer hover:opacity-50"
                      onClick={handleCancelEdit}
                    />
                  </>
                ) : (
                  <>
                    <FaPencilAlt
                      className="text-gray-700 h-3 w-3 cursor-pointer hover:opacity-50"
                      onClick={handleEditClick}
                    />
                    <FaTrash
                      color="red"
                      className="h-3 w-3 cursor-pointer hover:opacity-50"
                      onClick={() => onDelete(post.id)}
                    />
                  </>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="text-sm p-1 border-b focus:outline-none "
            />
          ) : (
            <span className="text-sm">{post.text}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-xs text-gray-400">
            {new Date(post.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">{getReactions()}</div>
        </div>
      </div>
    </div>
  );
};
