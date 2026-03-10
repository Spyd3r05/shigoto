"use client";
import { useState } from "react";
import OpportunityCard from "./opportunity_card";
import SectionHeader from "./section_header";

const OpportunityGrid = ({ opportunities }: { opportunities: any[] }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="mx-[12px] flex flex-col align-center justify-center text-center">
      <SectionHeader viewMode={viewMode} setViewMode={setViewMode} />
      <div
        className={`w-full ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col space-y-4"}`}
      >
        {opportunities.map((opp) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>
      <div className="mt-10 mb-8">
        <button className="border-2 border-[#4b9b9b] text-[#4b9b9b] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#e6f2f2] transition-colors">
          Load More Opportunities
        </button>
      </div>
    </div>
  );
};

export default OpportunityGrid;
