import { useState, useMemo } from "react";
import { Routine } from "@/types";
import { FaArrowUp, FaArrowDown, FaArrowsAltV, FaTrash } from "react-icons/fa";
import { FormField } from "@/components";

interface RoutinesTableProps {
  routines: Routine[];
  deleteRoutine: (id: string) => Promise<void>;
  onRowClick: (params: Routine) => void;
}

type SortParam =
  | "name"
  | "day"
  | "muscles"
  | "exercises"
  | "sets"
  | "reps"
  | "duration";

interface Header {
  label: string;
  param: SortParam;
}

export const RoutinesTable = ({
  routines,
  deleteRoutine,
  onRowClick,
}: RoutinesTableProps) => {
  const [isDescending, setIsDescending] = useState(false);
  const [sortParam, setSortParam] = useState("name");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const isAllSelected =
    routines.length > 0 && routines.length === selectedRowIds.length;

  const headers: Header[] = [
    { label: "Nombre", param: "name" },
    { label: "Dia", param: "day" },
    { label: "Musculos", param: "muscles" },
    { label: "Ejercicios", param: "exercises" },
    { label: "Series", param: "sets" },
    { label: "Reps", param: "reps" },
    { label: "Cardio", param: "duration" },
  ];

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
    console.log(selectAll);
  };

  const deleteAll = () => {
    routines.forEach((routine) => deleteRoutine(routine.id));
  };

  const getRoutineData = (routine: Routine) => {
    return routine.routine_exercises.reduce(
      (acc, item) => {
        acc.exercises += 1;
        acc.sets += item.sets;
        acc.reps += item.sets * item.reps;
        acc.duration += item.duration;
        const muscles = item.exercises.exercise_muscles.map(
          (e) => e.muscles.name
        );

        muscles.forEach((e) => !acc.muscles.includes(e) && acc.muscles.push(e));

        return acc;
      },
      { exercises: 0, sets: 0, reps: 0, duration: 0, muscles: [] }
    );
  };

  const getSortIcon = (param: SortParam) => {
    if (sortParam === param) {
      return isDescending ? <FaArrowDown /> : <FaArrowUp />;
    }
    return <FaArrowsAltV />;
  };

  const handleSort = (param: SortParam) => {
    if (sortParam === param) {
      setIsDescending(!isDescending);
    } else {
      setSortParam(param);
      setIsDescending(false);
    }
  };

  const filteredRoutines = useMemo(() => {
    return routines
      .filter((routine) => {
        return routine.name
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      })
      .sort((a, b) => {
        // Si no hay sortParam, no se hace nada
        if (!sortParam) return 0;

        const aData = getRoutineData(a);
        const bData = getRoutineData(b);

        let comparison = 0;

        if (sortParam === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortParam === "day") {
          comparison = a.day - b.day;
        } else if (sortParam === "muscles") {
          comparison = aData.muscles.length - bData.muscles.length;
        } else if (sortParam === "exercises") {
          comparison = aData.exercises - bData.exercises;
        } else if (sortParam === "sets") {
          comparison = aData.sets - bData.sets;
        } else if (sortParam === "reps") {
          comparison = aData.reps - bData.reps;
        } else if (sortParam === "duration") {
          comparison = aData.duration - bData.duration;
        }

        // Si isDescending es true, se invierte la comparacion
        return isDescending ? -comparison : comparison;
      });
  }, [routines, searchQuery, sortParam, isDescending]);

  return (
    <>
      <FormField
        id="searchbar"
        placeholder="Buscar"
        type="text"
        value={searchQuery}
        setValue={setSearchQuery}
      />

      <table className="mt-2">
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

            {headers.map((header) => {
              return (
                <th
                  key={header.param}
                  className="p-2"
                  onClick={() => handleSort(header.param)}
                >
                  <div className="flex gap-2">
                    <span className="text-sm">{header.label}</span>
                    {getSortIcon(header.param)}
                  </div>
                </th>
              );
            })}
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

          {filteredRoutines.map((routine) => {
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
                <td className="text-center">{routine.day || "Sin asignar"}</td>
                <td className="text-center">
                  {getRoutineData(routine).muscles}
                </td>
                <td className="text-center">
                  {getRoutineData(routine).exercises}
                </td>
                <td className="text-center">{getRoutineData(routine).sets}</td>
                <td className="text-center">{getRoutineData(routine).reps}</td>
                <td className="text-center">
                  {getRoutineData(routine).duration}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
