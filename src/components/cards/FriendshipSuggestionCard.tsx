import { FriendshipRequest, UserProfile } from "@/types";
import { FaUser } from "react-icons/fa";
import { UserAvatar, CustomButton } from "@/components";

interface ComponentProps {
  friendshipRequest?: FriendshipRequest;
  userProfile: UserProfile;
  onRequestSent: (to: string) => void;
  onRequestDelete: (requestId: string) => void;
}

export const FriendshipSuggestionCard = ({
  friendshipRequest,
  userProfile,
  onRequestSent,
  onRequestDelete,
}: ComponentProps) => {
  const sendRequest = () => {
    onRequestSent(userProfile.id);
  };

  const deleteRequest = () => {
    onRequestDelete(friendshipRequest.id);
  };

  return (
    <div className="border p-1 rounded-md border-gray-400 min-w-40 h-20 flex items-center gap-1">
      {userProfile.avatar ? (
        <div className="flex-1">
          <UserAvatar userProfile={userProfile} />
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex justify-center items-center w-16 h-16 border border-gray-400 rounded-full">
            <FaUser color="gray" className="w-6 h-6" />
          </div>
        </div>
      )}

      <div className="flex justify-between flex-col flex-1 h-full">
        <span className="text-sm font-bold">{userProfile.username}</span>
        <CustomButton
          label={friendshipRequest ? "Eliminar" : "Agregar"}
          size="sm"
          color={friendshipRequest ? "danger" : "info"}
          onClick={friendshipRequest ? deleteRequest : sendRequest}
        />
      </div>
    </div>
  );
};
