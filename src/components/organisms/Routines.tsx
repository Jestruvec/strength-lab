import { useState, useEffect } from "react";
import {
  CustomButton,
  RoutinesTable,
  RoutineForm,
  ErrorMessage,
} from "@/components";
import { Routine } from "@/types";
import { useRoutinesCrud } from "@/hooks";

export const Routines = () => {
  const { loading, error, routines, fetchRoutines, DeleteRoutine } =
    useRoutinesCrud();
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const [routineToEdit, setRoutineToEdit] = useState<Routine | null>(null);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  const toggleIsCreatingRoutine = () => {
    setIsCreatingRoutine((oldValue) => !oldValue);
    setRoutineToEdit(null);
    fetchRoutines();
  };

  const editRoutine = (routine: Routine) => {
    setRoutineToEdit(routine);
    toggleIsCreatingRoutine();
  };

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <CustomButton
          label={isCreatingRoutine ? "Regresar" : "Crear rutina"}
          onClick={toggleIsCreatingRoutine}
        />

        {isCreatingRoutine ? (
          <h1 className="text-2xl font-bold">Nueva rutina</h1>
        ) : (
          <></>
        )}
      </div>

      {isCreatingRoutine ? (
        <RoutineForm
          onRoutineSet={toggleIsCreatingRoutine}
          routineToEdit={routineToEdit}
        />
      ) : (
        <RoutinesTable
          onRowClick={(routine) => editRoutine(routine)}
          routines={routines}
          deleteRoutine={DeleteRoutine}
        />
      )}
    </div>
  );
};
