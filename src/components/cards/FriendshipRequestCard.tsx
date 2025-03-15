import { FriendshipRequest, UserProfile } from "@/types";
import { FaUser } from "react-icons/fa";
import { useFriendshipRequestsCrud } from "@/hooks";
import { useAuthContext } from "@/context";
import { useMemo, useState } from "react";
import { UserAvatar, CustomButton } from "@/components";

interface ComponentProps {
  userProfile: UserProfile;
}

export const FriendshipRequestCard = ({ userProfile }: ComponentProps) => {
  const { loading, postFriendshipRequest } = useFriendshipRequestsCrud();
  const [requestSent, setRequestSent] = useState(false);
  const { user } = useAuthContext();

  const disableBtn = useMemo(() => {
    return loading || requestSent || false;
  }, [loading, requestSent]);

  const sendFriendshipRequest = () => {
    const request = {
      from: user.id,
      to: userProfile.id,
    } as FriendshipRequest;

    postFriendshipRequest(request);
    setRequestSent(true);
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
        <span className="text-sm">{userProfile.username}</span>
        <CustomButton
          label={requestSent ? "Enviada" : "Agregar"}
          size="sm"
          disabled={disableBtn}
          loading={loading}
          onClick={sendFriendshipRequest}
        />
      </div>
    </div>
  );
};
