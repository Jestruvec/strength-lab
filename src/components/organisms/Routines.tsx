import { useState } from "react";
import {
  CustomButton,
  RoutinesTable,
  RoutineForm,
  Searchbar,
} from "@/components";
import { Routine } from "@/types";

export const Routines = () => {
  const [showForm, setShowForm] = useState(false);
  const [routineToEdit, setRoutineToEdit] = useState<Routine | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        <>
          <Searchbar value={searchQuery} setValue={setSearchQuery} />
          <RoutinesTable onRowClick={openForm} searchQuery={searchQuery} />
        </>
      )}
    </div>
  );
};
