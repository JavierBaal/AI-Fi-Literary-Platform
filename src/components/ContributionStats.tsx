import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookOpen, FileText, Users, BarChart2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface ContributionStatsProps {
  totalContributions?: number;
  contributionsByType?: Record<string, number>;
  totalAuthors?: number;
  mostPopularType?: string;
}

const ContributionStats = ({
  totalContributions = 6,
  contributionsByType = {
    reflection: 2,
    fiction: 2,
    greeting: 1,
    poetry: 1,
  },
  totalAuthors = 4,
  mostPopularType = "reflection",
}: ContributionStatsProps) => {
  const { t } = useLanguage();

  // Calculate percentages for the chart
  const typeEntries = Object.entries(contributionsByType);
  const total = typeEntries.reduce((sum, [_, count]) => sum + count, 0);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{t("stats.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.total")}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContributions}</div>
            <p className="text-xs text-muted-foreground">
              {t("stats.total.description")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.authors")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAuthors}</div>
            <p className="text-xs text-muted-foreground">
              {t("stats.authors.description")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.popular")}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {mostPopularType}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("stats.popular.description")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.distribution")}
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {typeEntries.map(([type, count]) => (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize">{type}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContributionStats;
