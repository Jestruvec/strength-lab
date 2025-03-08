import { useEffect, useState, useMemo } from "react";
import { useUserRoutinesCrud } from "@/hooks";
import { FormSelect } from "@/components";

export const Train = () => {
  const [day, setDay] = useState(1);
  const { error, loading, userRoutines, fetchUserRoutines } =
    useUserRoutinesCrud();

  const filteredItems = useMemo(() => {
    return userRoutines.filter((userRoutine) => userRoutine.day === day);
  }, [day, userRoutines]);

  useEffect(() => {
    fetchUserRoutines();
  }, [fetchUserRoutines]);

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

        {filteredItems.map(({ routines, id }) => {
          return (
            <div key={id}>
              <h1 className="text-2xl font-bold mb-3">{routines.name}</h1>

              <div className="flex flex-col gap-2">
                {routines.routine_exercises.map(
                  ({ exercises, sets, reps, duration, details, id }) => {
                    return (
                      <div
                        key={id}
                        className="flex h-40 gap-2 border rounded-md border-dashed border-gray-400 p-2"
                      >
                        <img
                          className="w-10 flex-2"
                          src={exercises.imgUrl}
                          alt={exercises.name}
                        />

                        <div className="flex-3">
                          <h3 className="font-bold">{exercises.name}</h3>

                          <div className="flex flex-col">
                            {exercises.variant && (
                              <span className="text-xs ">
                                Variante: {exercises.variant}
                              </span>
                            )}
                            {sets && (
                              <span className="text-xs ">Series: {sets}</span>
                            )}
                            {reps && (
                              <span className="text-xs ">
                                Repeticiones: {reps}
                              </span>
                            )}
                            {duration && (
                              <span className="text-xs ">
                                Duración: {duration}
                              </span>
                            )}
                          </div>

                          <div className="h-20 overflow-auto text-justify">
                            {details && <p className="text-xs">{details}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
