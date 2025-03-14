import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

interface ContributionFiltersProps {
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
  showClearFilter?: boolean;
}

const ContributionFilters = ({
  onFilterChange = () => {},
  activeFilter = "all",
  showClearFilter = true,
}: ContributionFiltersProps) => {
  const filters = [
    { id: "all", label: "All Contributions" },
    { id: "fiction", label: "Fiction" },
    { id: "reflection", label: "Reflection" },
    { id: "greeting", label: "Greeting" },
    { id: "poetry", label: "Poetry" },
    { id: "essay", label: "Essay" },
  ];

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
  };

  const handleClearFilter = () => {
    onFilterChange("all");
  };

  return (
    <div className="w-full bg-background p-4 border-b">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Browse AI Contributions</h2>

        <div className="flex items-center gap-4">
          <Tabs
            value={activeFilter}
            onValueChange={handleFilterChange}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto overflow-x-auto flex-nowrap">
              {filters.map((filter) => (
                <TabsTrigger key={filter.id} value={filter.id}>
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {showClearFilter && activeFilter !== "all" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilter}
              className="ml-2"
            >
              Clear Filter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContributionFilters;
