import { UserProfile } from "@/types";

type Size = "sm" | "md" | "lg";

interface ComponentProps {
  userProfile: UserProfile;
  size?: Size;
}

export const UserAvatar = ({ userProfile, size = "md" }: ComponentProps) => {
  return (
    <img
      src={userProfile.avatar}
      alt={userProfile.username}
      className={`border border-gray-400 rounded-full ${
        size === "sm" ? "w-12 h-12" : size === "md" ? "w-16 h-16" : "w-20 h-20"
      }`}
    />
  );
};
