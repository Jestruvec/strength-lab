import { useEffect, useState, useMemo } from "react";
import { useRoutinesCrud } from "@/hooks";
import { FormSelect, TrainExerciseCard } from "@/components";

export const Train = () => {
  const [day, setDay] = useState(1);
  const { error, loading, routines, fetchRoutines } = useRoutinesCrud();

  const filteredItems = useMemo(() => {
    return routines.filter((routine) => routine.day === day);
  }, [day, routines]);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  {
    if (loading) {
      return <>loading</>;
    }

    if (error) {
      return <>error</>;
    }

    return (
      <div className="w-full flex flex-col gap-2">
        <div className="p-2">
          <FormSelect
            id="day"
            value={day}
            setValue={setDay}
            label="Dia de entrenamiento"
            required
            options={[
              { value: 1, label: "Día 1" },
              { value: 2, label: "Día 2" },
              { value: 3, label: "Día 3" },
              { value: 4, label: "Día 4" },
              { value: 5, label: "Día 5" },
            ]}
          />
        </div>

        {!filteredItems.length && (
          <div className="flex justify-center">
            <span>No hay rutina asignada para este dia</span>
          </div>
        )}

        {filteredItems.map(({ routine_exercises, id, name }) => {
          return (
            <div key={id}>
              <h1 className="text-2xl font-bold mb-3">{name}</h1>

              <div className="flex flex-col gap-2">
                {routine_exercises.map((routineExercise) => {
                  return (
                    <TrainExerciseCard
                      key={routineExercise.id}
                      routineExercise={routineExercise}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
