import React from "react";
import { Button } from "./ui/button";

interface LanguageToggleProps {
  currentLanguage: string;
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onToggle }) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onToggle}
      className="px-2 py-1 text-sm font-medium"
    >
      {currentLanguage === "es" ? "EN" : "ES"}
    </Button>
  );
};

export default LanguageToggle;
