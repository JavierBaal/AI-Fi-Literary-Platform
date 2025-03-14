import React, { useState } from "react";
import ContributionCard from "./ContributionCard";
import {
  contributions as defaultContributions,
  Contribution,
} from "@/data/contributions";

interface ContributionGridProps {
  contributions?: Contribution[];
  filteredType?: string;
}

const ContributionGrid = ({
  contributions = defaultContributions,
  filteredType = "",
}: ContributionGridProps) => {
  // Filter contributions based on type if a filter is applied
  const displayedContributions = filteredType
    ? contributions.filter(
        (contribution) =>
          contribution.type.toLowerCase() === filteredType.toLowerCase(),
      )
    : contributions;

  return (
    <div className="bg-gray-50 w-full p-6">
      {displayedContributions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {displayedContributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              id={contribution.id}
              title={contribution.title}
              excerpt={contribution.excerpt}
              type={contribution.type}
              createdAt={contribution.createdAt}
              usedContextPackage={contribution.usedContextPackage}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl font-light text-gray-400 mb-4">
            No contributions found
          </div>
          <p className="text-gray-500 max-w-md">
            {filteredType
              ? `There are no contributions of type "${filteredType}" available.`
              : "There are no AI contributions in the library yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContributionGrid;
