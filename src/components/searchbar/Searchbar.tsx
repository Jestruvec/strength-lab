import { useState } from "react";
import { FormField } from "../inputs/FormField";

interface ComponentProps {
  placeholder?: string;
}

export const Searchbar = ({ placeholder = "Buscar" }: ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <FormField
      id="searchbar"
      placeholder={placeholder}
      type="text"
      value={searchQuery}
      setValue={setSearchQuery}
    />
  );
};
