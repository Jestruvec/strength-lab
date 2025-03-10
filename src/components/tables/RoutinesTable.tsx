import { useEffect, useState } from "react";
import { useRoutinesCrud } from "@/hooks";
import { ErrorMessage } from "../errors/ErrorMessage";
import { Routine } from "@/types";
import { FaTrash } from "react-icons/fa";

export const RoutinesTable = ({
  onRowClick,
}: {
  onRowClick: (params: Routine) => void;
}) => {
  const { loading, error, routines, fetchRoutines, DeleteRoutine } =
    useRoutinesCrud();
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const isAllSelected =
    routines.length > 0 && routines.length === selectedRowIds.length;

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  const toggleRowSelection = (routineId: string) => {
    if (selectedRowIds.includes(routineId)) {
      setSelectedRowIds(selectedRowIds.filter((id) => id !== routineId));
    } else {
      setSelectedRowIds([...selectedRowIds, routineId]);
    }
  };

  const toggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const allRowIds = routines.map((routine) => routine.id);
      setSelectedRowIds(allRowIds);
    } else {
      setSelectedRowIds([]);
    }

    setSelectAll(isChecked);

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (loading) {
      return <>Cargando...</>;
    }
  };

  const deleteAll = () => {
    routines.forEach((routine) => DeleteRoutine(routine.id));
  };

  return (
    <table>
      <thead>
        <tr className="border-b">
          <th className="p-2">
            <div className="flex gap-2">
              {selectedRowIds.length ? (
                <FaTrash
                  color="red"
                  className="cursor-pointer hover:opacity-50"
                  onClick={deleteAll}
                />
              ) : (
                <></>
              )}

              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </div>
          </th>
          <th className="p-2">
            <span className="text-sm">Nombre</span>
          </th>
          <th className="p-2">
            <span className="text-sm">Dia</span>
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
            <td colSpan={8} className="text-center p-10">
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
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={selectedRowIds.includes(routine.id)}
                  onChange={() => toggleRowSelection(routine.id)}
                  onClick={(event) => event.stopPropagation()}
                />
              </td>
              <td className="text-center">{routine.name}</td>
              <td className="text-center">{routine.day}</td>
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
                  acc += item.reps * item.sets;
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
