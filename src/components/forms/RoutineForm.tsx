import { useEffect, useState, useMemo } from "react";
import {
  CustomButton,
  FormField,
  EmptySection,
  FormSelect,
} from "@/components";
import {
  useExercisesCrud,
  useMusclesCrud,
  useRoutineExercisesCrud,
  useRoutinesCrud,
} from "@/hooks";
import { Exercise, Routine, RoutineExercise } from "@/types";
import { useAuthContext } from "@/context";

export const RoutineForm = ({
  onRoutineSet,
  routineToEdit,
}: {
  onRoutineSet: () => void;
  routineToEdit?: Routine;
}) => {
  const { user } = useAuthContext();
  const { muscles, fetchMuscles } = useMusclesCrud();
  const { exercises, fetchExercises } = useExercisesCrud();
  const { PostRoutine, PutRoutine } = useRoutinesCrud();
  const { PostRoutineExercise, PutRoutineExercise, DeleteRoutineExercise } =
    useRoutineExercisesCrud();

  const [selectedMusclesIds, setSelectedMusclesIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [routineData, setRoutineData] = useState<Routine>({
    name: "",
    day: 0,
    user_id: user.id,
  } as Routine);

  const [routineExercisesData, setRoutineExercisesData] = useState<
    RoutineExercise[]
  >([]);

  useEffect(() => {
    fetchExercises();
    fetchMuscles();

    if (routineToEdit) {
      setRoutineData(routineToEdit);
      setRoutineExercisesData(routineToEdit.routine_exercises);
    }
  }, [fetchExercises, fetchMuscles, routineToEdit]);

  const filteredExercises = useMemo(() => {
    return exercises.filter(
      (exercise) =>
        exercise.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
      // && exercise.exercise_muscles.some((e) =>
      //   selectedMusclesIds.includes(e.muscleId)
      // )
    );
  }, [exercises, searchQuery]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isEdition = !!routineToEdit;

    if (!routineExercisesData.length) {
      alert("Seleccione 1 o mas ejercicios");
      return;
    }

    if (isEdition) {
      await PutRoutine(routineToEdit.id, routineData);

      const { routine_exercises: previousExercises } = routineToEdit;
      const exercisesToDelete = previousExercises.filter((oldExercise) => {
        return !routineExercisesData.some(
          (newExercise) => newExercise.id === oldExercise.id
        );
      });

      if (exercisesToDelete.length) {
        const deletePromises = exercisesToDelete.map((e) =>
          DeleteRoutineExercise(e.id)
        );
        await Promise.all(deletePromises);
      }

      for (const exercise of routineExercisesData) {
        if (exercise.id) {
          await PutRoutineExercise(exercise.id, exercise);
        } else {
          await PostRoutineExercise([exercise]);
        }
      }
    } else {
      const newRoutine = await PostRoutine(routineData);
      const routineId = newRoutine[0].id;
      const routineExercises = routineExercisesData.map((e) => ({
        ...e,
        routineId,
      }));

      await PostRoutineExercise(routineExercises);
    }

    onRoutineSet();
  };

  const toggleMuscleSelection = (muscleId: string) => {
    if (selectedMusclesIds.includes(muscleId)) {
      setSelectedMusclesIds((value) => {
        return value.filter((id) => id !== muscleId);
      });
    } else {
      setSelectedMusclesIds((value) => [...value, muscleId]);
    }
  };

  const addRoutineExercise = (exercise: Exercise) => {
    const routineExercise: RoutineExercise = {
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      sets: 0,
      reps: 0,
      duration: 0,
      details: "",
    } as RoutineExercise;

    if (routineToEdit) {
      routineExercise.routineId = routineToEdit.id;
    }

    setRoutineExercisesData((value) => [...value, routineExercise]);
  };

  const deleteRoutineExercise = (routineExerciseId: string) => {
    setRoutineExercisesData((value) =>
      value.filter((e) => e.id !== routineExerciseId)
    );
  };

  const getExerciseName = (exerciseId: string) => {
    return exercises.find((exercise) => exercise.id === exerciseId)?.name;
  };

  const setRoutineExerciseData = (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
    field: keyof RoutineExercise
  ) => {
    const { value } = event.target;

    setRoutineExercisesData((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <FormField
          id="name"
          label="Nombre"
          placeholder="Nombre"
          type="text"
          value={routineData.name}
          setValue={(newValue: string) =>
            setRoutineData((prevRoutine) => ({
              ...prevRoutine,
              name: newValue,
            }))
          }
          required
        />

        <FormSelect
          id="day"
          value={routineData.day}
          setValue={(newValue: string) =>
            setRoutineData((prevRoutine) => ({
              ...prevRoutine,
              day: Number(newValue),
            }))
          }
          label="Dia de entrenamiento"
          required
          options={[
            { value: 0, label: "Seleccione un dia o deje sin asignar" },
            { value: 1, label: "Día 1" },
            { value: 2, label: "Día 2" },
            { value: 3, label: "Día 3" },
            { value: 4, label: "Día 4" },
            { value: 5, label: "Día 5" },
          ]}
        />

        <label className="text-sm font-medium">Seleccionar ejercicios</label>

        <div className="flex gap-1">
          {muscles.map((muscle) => {
            return (
              <div
                className={`${
                  selectedMusclesIds.includes(muscle.id) && "bg-gray-300"
                } border border-gray-400 cursor-pointer hover:bg-gray-200 rounded-md flex-1 overflow-hidden h-10`}
                key={muscle.id}
                onClick={() => toggleMuscleSelection(muscle.id)}
              >
                <span className="text-xs">{muscle.name}</span>
              </div>
            );
          })}
        </div>

        <FormField
          id="searchbar"
          placeholder="Buscar"
          type="text"
          value={searchQuery}
          setValue={setSearchQuery}
        />

        <div className="rounded-md border border-gray-400 shadow-md h-40 overflow-auto">
          {filteredExercises.length ? (
            filteredExercises.map((exercise) => {
              return (
                <div
                  key={exercise.id}
                  className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-400"
                  onClick={() => addRoutineExercise(exercise)}
                >
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

        <label className="text-sm font-medium">Ejercicios seleccionados</label>

        <div className="rounded-md border  border-gray-400 shadow-md h-40 overflow-y-auto overflow-x-hidden">
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
                              onChange={(e) =>
                                setRoutineExerciseData(e, id, "sets")
                              }
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
                              onChange={(e) =>
                                setRoutineExerciseData(e, id, "reps")
                              }
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
        </div>

        <CustomButton type="submit" />
      </div>
    </form>
  );
};
