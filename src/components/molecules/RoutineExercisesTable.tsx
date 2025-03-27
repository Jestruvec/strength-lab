import { Exercise, RoutineExercise } from "@/types";
import { EmptySection } from "../atoms/EmptySection";

interface ComponentProps {
  routineExercisesData: RoutineExercise[];
  exercises: Exercise[];
  setRoutineExerciseData: (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
    field: keyof RoutineExercise
  ) => void;
  deleteRoutineExercise: (string) => void;
}

export const RoutineExercisesTable = ({
  routineExercisesData,
  exercises,
  setRoutineExerciseData,
  deleteRoutineExercise,
}: ComponentProps) => {
  const getExerciseName = (exerciseId: string) => {
    return exercises.find((exercise) => exercise.id === exerciseId)?.name;
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-400">
          <th>
            <span className="text-xs">Nombre</span>
          </th>
          <th>
            <span className="text-xs">Series</span>
          </th>
          <th>
            <span className="text-xs">Repeticiones</span>
          </th>
          <th>
            <span className="text-xs">Duracion</span>
          </th>
          <th>
            <span className="text-xs">Detalles</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {routineExercisesData.length ? (
          routineExercisesData.map(
            ({ id, exerciseId, sets, reps, duration, details }) => {
              return (
                <tr key={id}>
                  <td>
                    <div className="flex justify-center">
                      <span className="text-xs">
                        {getExerciseName(exerciseId)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <input
                        name="sets"
                        type="number"
                        className="border-b w-10 text-sm"
                        value={sets}
                        onChange={(e) => setRoutineExerciseData(e, id, "sets")}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <input
                        name="reps"
                        type="number"
                        className="border-b w-10 text-sm"
                        value={reps}
                        onChange={(e) => setRoutineExerciseData(e, id, "reps")}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <input
                        name="duration"
                        type="number"
                        className="border-b w-10 text-sm"
                        value={duration}
                        onChange={(e) =>
                          setRoutineExerciseData(e, id, "duration")
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <input
                        name="details"
                        className="border-b w-10 text-sm"
                        value={details}
                        onChange={(e) =>
                          setRoutineExerciseData(e, id, "details")
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <span
                        className="text-red-500"
                        onClick={() => deleteRoutineExercise(id)}
                      >
                        X
                      </span>
                    </div>
                  </td>
                </tr>
              );
            }
          )
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="h-10">
                <EmptySection message="Seleccione 1 o mas ejercicios" />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
