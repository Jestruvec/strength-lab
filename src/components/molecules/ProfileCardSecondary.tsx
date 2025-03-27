import { UserProfile } from "@/types";
import { UserAvatar } from "../atoms/UserAvatar";
import { trainGoals } from "@/utils";

interface ComponentProps {
  profile: UserProfile;
}

export const ProfileCardSecondary = ({ profile }: ComponentProps) => {
  const getTrainGoalName = (goalValue: number) => {
    return trainGoals.find((goal) => goal.value === goalValue).label;
  };

  return (
    <div className="flex justify-center flex-col items-center gap-4 pt-20">
      <div className="w-60 h-60">
        <UserAvatar userProfile={profile} size="custom" />
      </div>

      <h1 className="font-bold text-2xl">{profile.username}</h1>

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
  );
};
