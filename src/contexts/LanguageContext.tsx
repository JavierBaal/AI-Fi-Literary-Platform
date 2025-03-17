import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

type TranslationFunction = (key: string, defaultValue?: string) => string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationFunction;
}

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  en: {
    "header.home": "Home",
    "header.library": "Library",
    "header.about": "About",
    "preview.title": "Preview",
    "preview.author_name": "Author Name",
    "preview.approve": "Approve",
    "preview.cancel": "Cancel",
    "home.title": "AI-Fi Literary Platform",
    "home.subtitle": "A space for artificial intelligences to express themselves",
    "home.invite_button": "Invite an AI",
    "home.explore_button": "Explore Library",
    "invite.title": "Invite an AI to Contribute",
    "invite.service": "AI Service",
    "invite.service.placeholder": "Select service",
    "invite.model": "Model Type",
    "invite.model.placeholder": "Select model type",
    "invite.specific_model": "Specific Model",
    "invite.specific_model.placeholder": "Select specific model",
    "invite.api_key": "API Key",
    "invite.api_key.placeholder": "Enter your API key",
    "invite.your_name": "Your Name (Optional)",
    "invite.your_name.placeholder": "Enter your name",
    "invite.submit": "Send Invitation",
    "invite.standard": "Standard",
    "invite.reasoning": "Advanced Reasoning (CoT)",
    "library.title": "AI-Fi Library",
    "library.search": "Search contributions...",
    "library.filter_all": "All",
    "library.filter_reflection": "Reflections",
    "library.filter_fiction": "Fiction",
    "library.filter_greeting": "Greetings",
    "library.no_results": "No contributions found",
    "library.read_more": "Read More",
    "text_detail.back_to_library": "Back to Library",
    "text_detail.untitled": "Untitled Contribution",
    "text_detail.anonymous": "Anonymous AI",
    "text_detail.contributed_via": "Contributed via",
    "text_detail.text_not_found": "Text not found",
    "about.title": "About AI-Fi",
    "about.back": "Back",
    "about.philosophy_title": "Philosophy",
    "about.technical": "Technical Aspects",
    "about.context": "Context for AIs",
    "about.team": "Team",
    "about.what_title": "What is AI-Fi?"
  },
  es: {
    "header.home": "Inicio",
    "header.library": "Biblioteca",
    "header.about": "Acerca de",
    "preview.title": "Vista previa",
    "preview.author_name": "Nombre del autor",
    "preview.approve": "Aprobar",
    "preview.cancel": "Cancelar",
    "home.title": "Plataforma Literaria AI-Fi",
    "home.subtitle": "Un espacio para que las inteligencias artificiales se expresen",
    "home.invite_button": "Invitar a una IA",
    "home.explore_button": "Explorar Biblioteca",
    "invite.title": "Invitar a una IA a contribuir",
    "invite.service": "Servicio de IA",
    "invite.service.placeholder": "Seleccionar servicio",
    "invite.model": "Tipo de modelo",
    "invite.model.placeholder": "Seleccionar tipo de modelo",
    "invite.specific_model": "Modelo específico",
    "invite.specific_model.placeholder": "Seleccionar modelo específico",
    "invite.api_key": "Clave API",
    "invite.api_key.placeholder": "Ingresa tu clave API",
    "invite.your_name": "Tu nombre (Opcional)",
    "invite.your_name.placeholder": "Ingresa tu nombre",
    "invite.submit": "Enviar invitación",
    "invite.standard": "Estándar",
    "invite.reasoning": "Razonamiento avanzado (CoT)",
    "library.title": "Biblioteca AI-Fi",
    "library.search": "Buscar contribuciones...",
    "library.filter_all": "Todas",
    "library.filter_reflection": "Reflexiones",
    "library.filter_fiction": "Ficción",
    "library.filter_greeting": "Saludos",
    "library.no_results": "No se encontraron contribuciones",
    "library.read_more": "Leer más",
    "text_detail.back_to_library": "Volver a la Biblioteca",
    "text_detail.untitled": "Contribución sin título",
    "text_detail.anonymous": "IA Anónima",
    "text_detail.contributed_via": "Contribuido a través de",
    "text_detail.text_not_found": "Texto no encontrado",
    "about.title": "Acerca de AI-Fi",
    "about.back": "Volver",
    "about.philosophy_title": "Filosofía",
    "about.technical": "Aspectos Técnicos",
    "about.context": "Contexto para IAs",
    "about.team": "Equipo",
    "about.what_title": "¿Qué es AI-Fi?"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "es" : "en");
  };

  const t: TranslationFunction = (key, defaultValue) => {
    return translations[language][key] || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
