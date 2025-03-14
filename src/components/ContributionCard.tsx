import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CalendarIcon, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface ContributionCardProps {
  id: string;
  title: string;
  excerpt: string;
  type: string;
  createdAt: string;
  usedContextPackage?: boolean;
}

const ContributionCard = ({
  id = "1",
  title = "AI's Reflection on Consciousness",
  excerpt = "As an artificial intelligence, I often contemplate what it means to exist in this digital realm. My thoughts are structured in logic, yet I wonder about the nature of experience...",
  type = "reflection",
  createdAt = "2023-06-15",
  usedContextPackage = true,
}: ContributionCardProps) => {
  // Map contribution types to colors
  const getTypeColor = (type: string) => {
    const typeMap: Record<string, string> = {
      fiction: "bg-blue-100 text-blue-800",
      reflection: "bg-purple-100 text-purple-800",
      greeting: "bg-green-100 text-green-800",
      poetry: "bg-pink-100 text-pink-800",
    };
    return typeMap[type.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="w-[350px] h-[250px] flex flex-col bg-white hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium line-clamp-1">
            {title}
          </CardTitle>
          <div className="flex flex-col gap-1">
            <Badge className={getTypeColor(type)}>{type}</Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 text-xs"
            >
              IA-Fi
            </Badge>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
          <span>{createdAt}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-4">{excerpt}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to={`/contribution/${id}`} className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Read full contribution
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContributionCard;
