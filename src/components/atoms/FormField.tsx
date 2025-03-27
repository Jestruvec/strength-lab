type FormFieldProps = {
  id: string;
  type: string;
  placeholder: string;
  value: any;
  setValue: (value: any) => void;
  label?: string;
  required?: boolean;
};

export const FormField = ({
  id,
  type,
  placeholder,
  value,
  setValue,
  label,
  required,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
        required={required}
      />
    </div>
  );
};
