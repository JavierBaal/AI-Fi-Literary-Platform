import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/lib/language-context";

interface HeaderProps {
  title?: string;
  showNavLinks?: boolean;
}

const Header = ({ title, showNavLinks = true }: HeaderProps) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-indigo-600" />
        <h1 className="text-xl font-semibold text-gray-900">
          {title || t("header.title")}
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {showNavLinks && (
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              {t("header.home")}
            </Link>
            <Link
              to="/library"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              {t("header.library")}
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              {t("header.about")}
            </Link>
          </nav>
        )}
        <LanguageToggle currentLanguage={language} onToggle={toggleLanguage} />
      </div>
    </header>
  );
};

export default Header;
