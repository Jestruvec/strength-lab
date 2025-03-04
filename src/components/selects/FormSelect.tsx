type FormSelectProps = {
  id: string;
  value: number;
  setValue: (value: number) => void;
  label: string;
  required?: boolean;
};

export const FormSelect = ({
  id,
  value,
  setValue,
  label,
  required,
}: FormSelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
        required={required}
      >
        <option value="1">Dia 1</option>
        <option value="2">Dia 2</option>
        <option value="3">Dia 3</option>
        <option value="4">Dia 4</option>
        <option value="5">Dia 5</option>
      </select>
    </div>
  );
};
