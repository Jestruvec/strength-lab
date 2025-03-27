import { useState } from "react";
import { CustomButton, RoutinesTable, RoutineForm } from "@/components";
import { Routine } from "@/types";

export const Routines = () => {
  const [showForm, setShowForm] = useState(false);
  const [routineToEdit, setRoutineToEdit] = useState<Routine | null>(null);

  const closeForm = () => {
    setShowForm(false);
    setRoutineToEdit(null);
  };

  const openForm = (routine?: Routine) => {
    if (routine) {
      setRoutineToEdit(routine);
    }

    setShowForm(true);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <CustomButton
          label={showForm ? "Regresar" : "Crear rutina"}
          onClick={showForm ? () => closeForm() : () => openForm()}
        />

        {showForm ? (
          <h1 className="text-2xl font-bold">
            {routineToEdit ? "Editar rutina" : "Nueva rutina"}
          </h1>
        ) : (
          <></>
        )}
      </div>

      {showForm ? (
        <RoutineForm onRoutineSet={closeForm} routineToEdit={routineToEdit} />
      ) : (
        <RoutinesTable onRowClick={openForm} />
      )}
    </div>
  );
};
