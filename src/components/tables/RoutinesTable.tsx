import { useEffect } from "react";
import { useRoutinesCrud } from "@/hooks";
import { ErrorMessage } from "../errors/ErrorMessage";
import { Routine } from "@/types";

export const RoutinesTable = ({
  onRowClick,
}: {
  onRowClick: (params: Routine) => void;
}) => {
  const { loading, error, routines, fetchRoutines } = useRoutinesCrud();

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return <>Cargando...</>;
  }

  return (
    <table>
      <thead>
        <tr className="border-b">
          <th className="p-2">
            <span className="text-sm">Nombre</span>
          </th>
          <th className="p-2">
            <span className="text-sm">Musculos</span>
          </th>
          <th className="p-2">
            <span className="text-sm">Ejercicios</span>
          </th>
          <th className="p-2">
            <span className="text-sm">Series</span>
          </th>
          <th className="p-2">
            <span className="text-sm">reps</span>
          </th>
          <th className="p-2">
            <span className="text-sm">Cardio</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {!routines.length && (
          <tr>
            <td colSpan={6} className="text-center">
              No hay registros
            </td>
          </tr>
        )}

        {routines.map((routine) => {
          return (
            <tr
              key={routine.id}
              className="h-10 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onRowClick(routine);
              }}
            >
              <td className="text-center">{routine.name}</td>
              <td className="text-center">lorem</td>
              <td className="text-center">
                {routine.routine_exercises.length}
              </td>
              <td className="text-center">
                {routine.routine_exercises.reduce((acc, item) => {
                  acc += item.sets;
                  return acc;
                }, 0)}
              </td>
              <td className="text-center">
                {routine.routine_exercises.reduce((acc, item) => {
                  acc += item.reps;
                  return acc;
                }, 0)}
              </td>
              <td className="text-center">
                {routine.routine_exercises.reduce((acc, item) => {
                  acc += item.duration;
                  return acc;
                }, 0)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
