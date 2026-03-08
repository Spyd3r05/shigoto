import React from "react";
import { Grid, ListIcon } from "lucide-react";

interface SectionheaderProps {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}

const SectionHeader = ({ viewMode, setViewMode }: SectionheaderProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <h2 className="text-2xl font-bold">Latest Opportunities</h2>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <div className="flex items-center space-x-2 bg-[#ecfdf5] text-emerald-600 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span>Updated 2 mins ago • 12 new</span>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
          <button
            className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-[#e6f2f2] text-[#4b9b9b]" : "text-gray-400 hover:text-gray-600"}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={16} />
          </button>
          <button
            className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-[#e6f2f2] text-[#4b9b9b]" : "text-gray-400 hover:text-gray-600"}`}
            onClick={() => setViewMode("list")}
          >
            <ListIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
