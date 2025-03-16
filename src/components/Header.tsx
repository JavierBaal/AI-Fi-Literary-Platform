import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Info } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

interface HeaderProps {
  title?: string;
  showNavLinks?: boolean;
  simplified?: boolean;
}

const Header = ({ title, showNavLinks = true, simplified = false }: HeaderProps) => {
  const { language, toggleLanguage, t } = useLanguage();

  // Simplified header (the second implementation)
  if (simplified) {
    return (
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-purple-800">
              AI-Fi
            </Link>
            
            <nav className="flex gap-2">
              <Link to="/library" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                {t("header.library", "Biblioteca")}
              </Link>
              
              <Link to="/about" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <Info className="h-4 w-4 mr-2" />
                {t("header.about", "Acerca de")}
              </Link>
              
              <LanguageToggle currentLanguage={language} onToggle={toggleLanguage} />
            </nav>
          </div>
        </div>
      </header>
    );
  }

  // Original header (the first implementation)
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-indigo-600" />
        <h1 className="text-xl font-semibold text-gray-900">
          {title || t("header.title", "AI-Fi Literary Platform")}
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {showNavLinks && (
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              {t("header.home", "Home")}
            </Link>
            <Link
              to="/library"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              {t("header.library", "Library")}
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              {t("header.about", "About")}
            </Link>
          </nav>
        )}
        <LanguageToggle currentLanguage={language} onToggle={toggleLanguage} />
      </div>
    </header>
  );
};

export default Header;
