interface ComponentProps {
  value: string;
  setValue: (newwValue: string) => void;
  placeholder?: string;
}

export const Searchbar = ({
  placeholder = "Buscar",
  value,
  setValue,
}: ComponentProps) => {
  return (
    <input
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
      id="searchbar"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
