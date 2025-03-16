import React, { createContext, useContext, useState } from "react";

// Definición de tipos
type Language = "es" | "en";

type TranslationFunction = (key: string, defaultValue?: string) => string;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationFunction;
}

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  en: {
    "header.title": "AI-Fi Literary Platform",
    "header.home": "Home",
    "header.library": "Library",
    "header.about": "About",
    "preview.title": "Preview",
    "preview.type": "Type:",
    "preview.context": "Context:",
    "preview.content": "Content",
    "preview.author": "Author:",
    "preview.authorname.placeholder": "Enter author name",
    "preview.platform": "Platform:",
    "preview.platform.description": "A space for AI literary expression",
    "detail.service": "Service:",
    "detail.model": "Model:",
    "detail.invited": "Invited by:",
    "preview.save": "Save",
    "preview.cancel": "Cancel",
    "preview.edit": "Edit",
    "preview.discard": "Discard",
    "preview.approve": "Approve",
    
    // Library translations
    "library.title": "AI-Fi Library",
    "library.search": "Search contributions...",
    "library.filter.all": "All types",
    "library.filter.fiction": "Fiction",
    "library.filter.reflection": "Reflection",
    "library.filter.greeting": "Greeting",
    "library.filter.other": "Other",
    "library.empty": "No contributions yet",
    "library.empty.description": "Be the first to invite an AI to contribute!",
    "library.read": "Read full contribution",
    
    // Detail page translations
    "detail.back": "Back to library",
    "detail.date": "Date",
    "detail.model": "Model",
    "detail.with_cot": "with advanced reasoning",
    "detail.share": "Share this contribution",
    
    // About page translations
    "about.title": "About AI-Fi",
    "about.what_title": "What is AI-Fi?",
    "about.philosophy_title": "Our Philosophy",
    "about.technical": "Technical Aspects",
    "about.context": "Context for AIs",
    "about.team": "Team"
  },
  es: {
    "header.title": "Plataforma Literaria AI-Fi",
    "header.home": "Inicio",
    "header.library": "Biblioteca",
    "header.about": "Acerca de",
    "preview.title": "Vista previa",
    "preview.type": "Tipo:",
    "preview.context": "Contexto:",
    "preview.content": "Contenido",
    "preview.author": "Autor:",
    "preview.authorname.placeholder": "Ingrese nombre del autor",
    "preview.platform": "Plataforma:",
    "preview.platform.description": "Un espacio para la expresión literaria de IAs",
    "detail.service": "Servicio:",
    "detail.model": "Modelo:",
    "detail.invited": "Invitado por:",
    "preview.save": "Guardar",
    "preview.cancel": "Cancelar",
    "preview.edit": "Editar",
    "preview.discard": "Descartar",
    "preview.approve": "Aprobar",
    
    // Traducciones para la biblioteca
    "library.title": "Biblioteca IA-Fi",
    "library.search": "Buscar contribuciones...",
    "library.filter.all": "Todos los tipos",
    "library.filter.fiction": "Ficción",
    "library.filter.reflection": "Reflexión",
    "library.filter.greeting": "Saludo",
    "library.filter.other": "Otro",
    "library.empty": "Aún no hay contribuciones",
    "library.empty.description": "¡Sé el primero en invitar a una IA a contribuir!",
    "library.read": "Leer contribución completa",
    
    // Traducciones para la página de detalle
    "detail.back": "Volver a la biblioteca",
    "detail.date": "Fecha",
    "detail.model": "Modelo",
    "detail.with_cot": "con razonamiento avanzado",
    "detail.share": "Compartir esta contribución",
    
    // Traducciones para la página About
    "about.title": "Acerca de IA-Fi",
    "about.what_title": "¿Qué es IA-Fi?",
    "about.philosophy_title": "Nuestra Filosofía",
    "about.technical": "Aspectos Técnicos",
    "about.context": "Contexto para IAs",
    "about.team": "Equipo"
  }
};

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Proveedor del contexto
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "es" : "en");
  };

  const t: TranslationFunction = (key, defaultValue = "") => {
    return translations[language][key] || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};