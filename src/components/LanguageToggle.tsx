import React from "react";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LanguageToggleProps {
  currentLanguage: "en" | "es";
  onToggle: () => void;
}

const LanguageToggle = ({
  currentLanguage = "en",
  onToggle = () => {},
}: LanguageToggleProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-muted-foreground hover:text-primary"
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={currentLanguage !== "en" ? onToggle : undefined}
          className={currentLanguage === "en" ? "bg-muted/50 font-medium" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={currentLanguage !== "es" ? onToggle : undefined}
          className={currentLanguage === "es" ? "bg-muted/50 font-medium" : ""}
        >
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
