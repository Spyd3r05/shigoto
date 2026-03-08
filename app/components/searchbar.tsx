import React from "react";
import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <div className="w-full mx-auto max-w-3xl flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm mb-6">
      <div className="flex-1 flex items-center px-3 text-slate-400">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search job titles, skills, or companies..."
          className="w-full bg-transparent border-none outline-none text-slate-700 px-3 py-2 text-base"
        />
      </div>
      <button className="bg-[#4b9b9b] hover:bg-[#3f8383] text-white px-8 py-3 rounded-lg font-medium transition-colors">
        Search
      </button>
    </div>
  );
};

export default Searchbar;
