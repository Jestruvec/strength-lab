type Option = {
  value: any;
  label: string;
};

type FormSelectProps = {
  id: string;
  value: any;
  setValue: (value: any) => void;
  label: string;
  options: Option[];
  required?: boolean;
};

export const FormSelect = ({
  id,
  value,
  setValue,
  label,
  options,
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
        onChange={(e) => setValue(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
