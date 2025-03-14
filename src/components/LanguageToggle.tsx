import React from "react";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  currentLanguage: "en" | "es";
  onToggle: () => void;
}

const LanguageToggle = ({
  currentLanguage = "en",
  onToggle = () => {},
}: LanguageToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="flex items-center gap-1 text-muted-foreground hover:text-primary"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLanguage === "en" ? "ES" : "EN"}</span>
    </Button>
  );
};

export default LanguageToggle;
