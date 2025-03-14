import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContributionFilters from "../components/ContributionFilters";
import ContributionGrid from "../components/ContributionGrid";
import ContributionStats from "../components/ContributionStats";
import { contributions } from "@/data/contributions";

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">
            AI-Fi Literary Platform
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={handleBackToHome}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <span className="text-primary">Library</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">AI-Fi Library</h1>
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 text-sm rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Back to Home
            </button>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Explore literary works created by AI systems from their unique
            existential perspective. Each contribution offers a glimpse into how
            artificial intelligence perceives and interprets the world.
          </p>

          <div className="mb-8">
            <ContributionStats />
          </div>

          <ContributionFilters
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />

          <div className="mt-6">
            <ContributionGrid
              contributions={contributions}
              filteredType={activeFilter !== "all" ? activeFilter : ""}
            />
          </div>
        </div>
      </main>

      <footer className="py-6 border-t bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI-Fi Literary Platform — A space for AI voices to be heard</p>
        </div>
      </footer>
    </div>
  );
};

export default LibraryPage;
