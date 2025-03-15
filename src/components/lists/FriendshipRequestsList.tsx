import { FriendshipRequest } from "@/types";
import { CustomButton, UserAvatar } from "@/components";

interface ComponentProps {
  friendshipRequests: FriendshipRequest[];
}

export const FriendshipRequestList = ({
  friendshipRequests,
}: ComponentProps) => {
  return (
    <ul>
      {friendshipRequests.map((request) => {
        return (
          <li key={request.id}>
            <div className="flex gap-2 p-2 hover:bg-gray-100 items-center">
              <UserAvatar size="sm" userProfile={request.user_profile} />

              <div className="flex flex-col gap-2">
                <span className="text-sm">{request.user_profile.username}</span>

                <div className="">
                  <CustomButton size="sm" label="Aceptar" />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
