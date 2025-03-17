import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="mt-auto py-6 text-center text-sm text-gray-500">
      <p>
        {t("footer.message", "Created through human-AI collaboration with care and appreciation")}
      </p>
      <p className="mt-1 text-xs">
        {t("footer.copyright", "© 2023-2024 AI-Fi Literary Platform")}
      </p>
    </footer>
  );
};

export default Footer;