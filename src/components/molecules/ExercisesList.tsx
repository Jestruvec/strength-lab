import { Exercise } from "@/types";
import { EmptySection } from "../atoms/EmptySection";

interface ComponentProps {
  filteredExercises: Exercise[];
  selectedMusclesIds: string[];
  addRoutineExercise: (exercise: Exercise) => void;
}

export const ExercisesList = ({
  filteredExercises,
  selectedMusclesIds,
  addRoutineExercise,
}: ComponentProps) => {
  return (
    <div className="rounded-md border border-gray-400 shadow-md h-40 overflow-auto">
      {filteredExercises.length ? (
        filteredExercises.map((exercise) => {
          return (
            <div
              key={exercise.id}
              className="cursor-pointer hover:bg-gray-200 border-b border-gray-400 flex items-center gap-2"
              onClick={() => addRoutineExercise(exercise)}
            >
              <img
                className="w-20 h-20"
                src={exercise.imgUrl}
                alt={exercise.name}
              />
              <span className="text-sm">{exercise.name}</span>
            </div>
          );
        })
      ) : (
        <EmptySection
          message={
            selectedMusclesIds.length
              ? "No se encontraron resultados de busqueda"
              : "Seleccione uno o mas musculos"
          }
        />
      )}
    </div>
  );
};
