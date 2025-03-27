import { Muscle } from "@/types";
import { CustomChip } from "../atoms/CustomChip";

interface ComponentProps {
  loading: boolean;
  muscles: Muscle[];
  selectedMusclesIds: string[];
  toggleMuscleSelection: (id: string) => void;
}

export const MusclesChips = ({
  loading,
  muscles,
  selectedMusclesIds,
  toggleMuscleSelection,
}: ComponentProps) => {
  return (
    <div className="flex gap-1">
      {loading ? (
        <>Loading...</>
      ) : (
        muscles.map((muscle) => {
          return (
            <CustomChip
              key={muscle.id}
              text={muscle.name}
              isSelected={selectedMusclesIds.includes(muscle.id)}
              onClick={() => toggleMuscleSelection(muscle.id)}
            />
          );
        })
      )}
    </div>
  );
};
