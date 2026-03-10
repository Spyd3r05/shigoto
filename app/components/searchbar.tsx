import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

const Searchbar = ({
  handleSearch,
}: {
  handleSearch: (query: string) => void;
}) => {
  // search filter functionality
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    handleSearch(value);
  }, 200);
  return (
    <div className="w-full mx-auto max-w-3xl flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm mb-6">
      <div className="flex-1 flex items-center px-3 text-slate-400">
        <Search size={20} />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search job titles, skills, or companies..."
          className="w-full bg-transparent border-none outline-none text-slate-700 px-3 py-2 text-base"
        />
      </div>
    </div>
  );
};

export default Searchbar;
