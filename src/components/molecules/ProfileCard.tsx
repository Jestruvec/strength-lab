import { FaPencilAlt } from "react-icons/fa";
import { UserAvatar } from "../atoms/UserAvatar";
import { UserProfile } from "@/types";
import { trainGoals } from "@/utils";

interface ComponentProps {
  profile: UserProfile;
  onProfileEdit: () => void;
}

export const ProfileCard = ({ profile, onProfileEdit }: ComponentProps) => {
  const getTrainGoalName = (goalValue: number) => {
    return trainGoals.find((goal) => goal.value === goalValue).label;
  };

  return (
    <div className="flex gap-4">
      <div className="w-48 h-48">
        <UserAvatar userProfile={profile} size="custom" />
      </div>

      <div className="flex-3">
        <div className="flex justify-between gap-2 items-center mb-4">
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <button
            className="cursor-pointer hover:opacity-50"
            onClick={onProfileEdit}
          >
            <FaPencilAlt className="text-gray-500" />
          </button>
        </div>

        <ul>
          <li>
            <label className="text-sm">Edad: </label>
            <span className="font-bold text-sm">{profile.age}</span>
          </li>
          <li>
            <label className="text-sm">Peso: </label>
            <span className="font-bold text-sm">{profile.weight}</span>
          </li>
          <li>
            <label className="text-sm">Altura: </label>
            <span className="font-bold text-sm">{profile.height}</span>
          </li>
          <li>
            <label className="text-sm">Objetivo: </label>
            <span className="font-bold text-sm">
              {getTrainGoalName(profile.goal)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
