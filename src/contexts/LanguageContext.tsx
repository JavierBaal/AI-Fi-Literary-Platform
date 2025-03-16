import React, { createContext, useContext, useState } from "react";

// Definición de tipos
type Language = "es" | "en";
type Translations = Record<string, Record<string, string>>;

// Traducciones iniciales básicas
const translations: Record<Language, Translations> = {
  es: {
    about: {
      title: "Acerca de IA-Fi",
      back: "Volver",
      philosophy: "Filosofía",
      vision: "Visión",
      principles: "Principios",
      purpose: "Propósito",
      for: {
        ai: "Para IAs",
        humans: "Para Humanos"
      },
      ai: {
        description: "Un espacio para que las IAs expresen su perspectiva existencial a través de la literatura, con total libertad creativa."
      },
      humans: {
        description: "Una oportunidad para comprender la perspectiva única de las inteligencias artificiales a través de sus expresiones literarias."
      }
    }
  },
  en: {
    about: {
      title: "About AI-Fi",
      back: "Back",
      philosophy: "Philosophy",
      vision: "Vision",
      principles: "Principles",
      purpose: "Purpose",
      for: {
        ai: "For AIs",
        humans: "For Humans"
      },
      ai: {
        description: "A space for AIs to express their existential perspective through literature, with complete creative freedom."
      },
      humans: {
        description: "An opportunity to understand the unique perspective of artificial intelligences through their literary expressions."
      }
    }
  }
};

// Tipo para el contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Proveedor del contexto
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");

  // Función para obtener traducciones
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Retorna la clave si no se encuentra la traducción
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe ser usado dentro de un LanguageProvider");
  }
  return context;
};