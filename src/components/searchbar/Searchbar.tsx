import { useState } from "react";
import { FormField } from "../inputs/FormField";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  <FormField
    id="searchbar"
    placeholder="Buscar"
    type="text"
    value={searchQuery}
    setValue={setSearchQuery}
  />;
};
