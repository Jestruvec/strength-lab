import { RoutineExercise } from "@/types";

interface TrainExerciseCardProps {
  routineExercise: RoutineExercise;
}

export const TrainExerciseCard = ({
  routineExercise,
}: TrainExerciseCardProps) => {
  const { id, exercises, sets, reps, duration, details } = routineExercise;

  return (
    <div
      key={id}
      className="flex  h-40 gap-2 border rounded-md border-dashed border-gray-400 p-2"
    >
      <img
        className="w-10 max-w-40 flex-2"
        src={exercises.imgUrl}
        alt={exercises.name}
      />

      <div className="flex-3">
        <h3 className="font-bold">{exercises.name}</h3>

        <div className="flex flex-col">
          {exercises.variant && (
            <span className="text-xs">Variante: {exercises.variant}</span>
          )}
          {sets !== 0 && sets !== null && sets !== undefined && (
            <span className="text-xs">Series: {sets}</span>
          )}
          {reps !== 0 && reps !== null && reps !== undefined && (
            <span className="text-xs">Repeticiones: {reps}</span>
          )}
          {duration !== 0 && duration !== null && duration !== undefined && (
            <span className="text-xs">Duración: {duration}</span>
          )}
        </div>

        <div className="h-20 overflow-auto text-justify">
          {details && <p className="text-xs">{details}</p>}
        </div>
      </div>
    </div>
  );
};
