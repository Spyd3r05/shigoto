"use client";
import { useState } from "react";
import { defaultOpportunities } from "../data/opportunities";
import OpportunityCard from "./opportunity_card";
import SectionHeader from "./section_header";

const OpportunityGrid = () => {
  const [opportunities, setOpportunities] =
    useState<any[]>(defaultOpportunities);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <div className="mx-[12px]">
      <SectionHeader viewMode={viewMode} setViewMode={setViewMode} />
      <div
        className={`w-full ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col space-y-4"}`}
      >
        {opportunities.map((opp) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>
    </div>
  );
};

export default OpportunityGrid;
