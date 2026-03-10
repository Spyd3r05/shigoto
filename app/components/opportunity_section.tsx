"use client";

import { useState } from "react";
import Searchbar from "./searchbar";
import Filters from "./filters";
import OpportunityGrid from "./opportunity_grid";
import { defaultOpportunities } from "../data/opportunities"; // your type

const OpportunitySection = ({
  initialOpportunities,
}: {
  initialOpportunities: typeof defaultOpportunities;
}) => {
  const [opportunities] = useState(initialOpportunities);
  const [filteredOpportunities, setFilteredOpportunities] =
    useState(initialOpportunities);

  const handleSearch = (query: string) => {
    setFilteredOpportunities(
      opportunities.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <Filters />
      <OpportunityGrid opportunities={filteredOpportunities} />
    </>
  );
};

export default OpportunitySection;
