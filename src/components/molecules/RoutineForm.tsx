import { useEffect, useState, useMemo } from "react";
import { trainDays } from "@/utils";
import {
  CustomButton,
  FormField,
  FormSelect,
  Searchbar,
  RoutineExercisesTable,
  ExercisesList,
  MusclesChips,
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
  const { fetchMuscles, muscles, loading: loadingMuscles } = useMusclesCrud();
  const { exercises, fetchExercises } = useExercisesCrud();
  const { PostRoutine, PutRoutine } = useRoutinesCrud();
  const {
    PostRoutineExercise,
    PutRoutineExercise,
    DeleteRoutineExercise,
    loading,
  } = useRoutineExercisesCrud();

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
      const { routine_exercises, ...rest } = routineToEdit;

      setRoutineData(rest);
      setRoutineExercisesData(
        routine_exercises.map((exercise) => {
          delete exercise.exercises;
          return exercise;
        })
      );
    }
  }, [fetchExercises, fetchMuscles, routineToEdit]);

  const filteredExercises = useMemo(() => {
    return exercises.filter(
      (exercise) =>
        exercise.name.toLocaleLowerCase().includes(searchQuery.toLowerCase()) &&
        exercise.exercise_muscles.some((e) =>
          selectedMusclesIds.includes(e.muscleId)
        )
    );
  }, [exercises, searchQuery, selectedMusclesIds]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!routineExercisesData.length) {
      alert("Seleccione 1 o mas ejercicios");
      return;
    }

    const isEdition = !!routineToEdit;

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
        const { id, routineId, exerciseId, sets, reps, duration, details } =
          exercise;
        const isEdition = !!routineToEdit.routine_exercises.find(
          (e) => e.id === id
        );

        if (isEdition) {
          await PutRoutineExercise(exercise.id, exercise);
        } else {
          const data = { routineId, exerciseId, sets, reps, duration, details };
          await PostRoutineExercise([data] as RoutineExercise[]);
        }
      }
    } else {
      const newRoutine = await PostRoutine(routineData);
      const routineId = newRoutine[0].id;
      const routineExercises = routineExercisesData.map((exercise) => {
        const { exerciseId, sets, reps, duration, details } = exercise;

        return {
          routineId,
          exerciseId,
          sets,
          reps,
          duration,
          details,
        };
      });

      await PostRoutineExercise(routineExercises as RoutineExercise[]);
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

  const handleInputChange = (field: string, newValue: string | number) => {
    setRoutineData((prevRoutine) => ({
      ...prevRoutine,
      [field]: newValue,
    }));
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
          setValue={(newValue) => handleInputChange("name", newValue)}
          required
        />

        <FormSelect
          id="day"
          value={routineData.day}
          setValue={(newValue) => handleInputChange("day", Number(newValue))}
          label="Dia de entrenamiento"
          required
          options={trainDays}
        />

        <h3 className="text-sm font-medium">Seleccionar ejercicios</h3>

        <MusclesChips
          loading={loadingMuscles}
          muscles={muscles}
          selectedMusclesIds={selectedMusclesIds}
          toggleMuscleSelection={toggleMuscleSelection}
        />

        <Searchbar value={searchQuery} setValue={setSearchQuery} />

        <ExercisesList
          addRoutineExercise={addRoutineExercise}
          filteredExercises={filteredExercises}
          selectedMusclesIds={selectedMusclesIds}
        />

        <h3 className="text-sm font-medium">Ejercicios seleccionados</h3>

        <div className="rounded-md border  border-gray-400 shadow-md h-40 overflow-y-auto overflow-x-hidden">
          <RoutineExercisesTable
            exercises={exercises}
            routineExercisesData={routineExercisesData}
            setRoutineExerciseData={setRoutineExerciseData}
            deleteRoutineExercise={deleteRoutineExercise}
          />
        </div>

        <CustomButton type="submit" disabled={loading} />
      </div>
    </form>
  );
};
