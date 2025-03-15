import { UserProfile } from "@/types";

interface ComponentProps {
  userProfile: UserProfile;
}

export const UserAvatar = ({ userProfile }: ComponentProps) => {
  return (
    <img
      src={userProfile.avatar}
      alt={userProfile.username}
      className="w-16 h-16 border border-gray-400 rounded-full "
    />
  );
};
