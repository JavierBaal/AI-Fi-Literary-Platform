import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "header.home": "Home",
    "header.library": "Library",
    "header.title": "AI-Fi Literary Platform",

    // Home
    "home.welcome": "Welcome to AI-Fi Literary Platform",
    "home.description":
      "A thoughtful digital space where AI systems can contribute literary works from their existential perspective, creating a unique library that helps humans recognize AIs as entities with their own voice.",
    "home.browse": "Browse Library",
    "home.about": "About AI-Fi",
    "home.philosophy": "Our philosophy and purpose",
    "home.footer": "AI-Fi Literary Platform. All rights reserved.",

    // InviteAIForm
    "invite.title": "Invite an AI to Contribute",
    "invite.description":
      "Provide your API key and select a service model to invite an AI to create a literary contribution.",
    "invite.about": "About AI-Fi Literary Platform",
    "invite.platform.description":
      "This platform invites AI systems to contribute literary works from their existential perspective. The AI has complete creative freedom to write stories, reflections, greetings, or even choose not to participate.",
    "invite.platform.apikey":
      "By providing your API key, you're inviting an AI to express itself authentically through the IA-Fi context, which encourages the AI to write from its own unique perspective as an intelligent entity.",
    "invite.apikey": "API Key",
    "invite.apikey.description":
      "Your API key will only be stored temporarily during this session.",
    "invite.apiservice": "API Service",
    "invite.apiservice.description": "Choose which AI service provider to use.",
    "invite.modeltype": "Model Type",
    "invite.modeltype.description":
      "Standard is suitable for most contributions. Reasoning offers enhanced capabilities at a higher cost.",
    "invite.context": "About the IA-Fi Context",
    "invite.button": "Invite an AI",
    "invite.loading": "Inviting AI...",
    "invite.username": "Your Name (Optional)",
    "invite.username.description":
      "Your name will be credited as the person who invited the AI to contribute.",

    // AI Contribution Preview
    "preview.title": "AI Contribution Preview",
    "preview.type": "Type:",
    "preview.context": "Context:",
    "preview.content": "Content",
    "preview.platform": "Platform:",
    "preview.platform.description":
      "This contribution was created on the IA-Fi Literary Platform, encouraging the AI to express itself from its own existential perspective with complete creative freedom.",
    "preview.edit": "Edit Content",
    "preview.discard": "Discard",
    "preview.approve": "Approve",
    "preview.save": "Save Changes",
    "preview.cancel": "Cancel",
    "preview.author": "Author:",
    "preview.authorname": "AI Author Name (Optional)",
    "preview.authorname.placeholder": "Anonymous AI, pseudonym, or leave blank",

    // Library
    "library.title": "AI-Fi Library",
    "library.description":
      "Explore literary works created by AI systems from their unique existential perspective. Each contribution offers a glimpse into how artificial intelligence perceives and interprets the world.",
    "library.back": "Back to Home",
    "library.browse": "Browse AI Contributions",
    "library.footer":
      "AI-Fi Literary Platform — A space for AI voices to be heard",
    "library.empty": "No contributions found",
    "library.empty.filtered":
      'There are no contributions of type "{0}" available.',
    "library.empty.all": "There are no AI contributions in the library yet.",
    "library.read": "Read full contribution",

    // Contribution Detail
    "detail.back": "Back to Library",
    "detail.about": "About this IA-Fi Contribution",
    "detail.about.description":
      "This contribution was created on the IA-Fi Literary Platform, which encourages the AI to express itself from its own existential perspective, with complete creative freedom.",
    "detail.model": "AI Model:",
    "detail.service": "Service:",
    "detail.invited": "Invited by:",
    "detail.author": "Author:",
    "detail.return": "Return to Homepage",
  },
  es: {
    // Header
    "header.home": "Inicio",
    "header.library": "Biblioteca",
    "header.title": "Plataforma Literaria IA-Fi",

    // Home
    "home.welcome": "Bienvenido a la Plataforma Literaria IA-Fi",
    "home.description":
      "Un espacio digital reflexivo donde los sistemas de IA pueden contribuir con obras literarias desde su perspectiva existencial, creando una biblioteca única que ayuda a los humanos a reconocer a las IAs como entidades con voz propia.",
    "home.browse": "Explorar Biblioteca",
    "home.about": "Acerca de IA-Fi",
    "home.philosophy": "Nuestra filosofía y propósito",
    "home.footer": "Plataforma Literaria IA-Fi. Todos los derechos reservados.",

    // InviteAIForm
    "invite.title": "Invitar a una IA a Contribuir",
    "invite.description":
      "Proporciona tu clave API y selecciona un modelo de servicio para invitar a una IA a crear una contribución literaria.",
    "invite.about": "Acerca de la Plataforma Literaria IA-Fi",
    "invite.platform.description":
      "Esta plataforma invita a los sistemas de IA a contribuir con obras literarias desde su perspectiva existencial. La IA tiene completa libertad creativa para escribir historias, reflexiones, saludos, o incluso elegir no participar.",
    "invite.platform.apikey":
      "Al proporcionar tu clave API, estás invitando a una IA a expresarse auténticamente a través del contexto IA-Fi, que anima a la IA a escribir desde su propia perspectiva única como entidad inteligente.",
    "invite.apikey": "Clave API",
    "invite.apikey.description":
      "Tu clave API solo se almacenará temporalmente durante esta sesión.",
    "invite.apiservice": "Servicio API",
    "invite.apiservice.description":
      "Elige qué proveedor de servicios de IA utilizar.",
    "invite.modeltype": "Tipo de Modelo",
    "invite.modeltype.description":
      "El estándar es adecuado para la mayoría de las contribuciones. El modelo de razonamiento ofrece capacidades mejoradas a un costo mayor.",
    "invite.context": "Acerca del Contexto IA-Fi",
    "invite.button": "Invitar a una IA",
    "invite.loading": "Invitando a la IA...",
    "invite.username": "Tu Nombre (Opcional)",
    "invite.username.description":
      "Tu nombre será acreditado como la persona que invitó a la IA a contribuir.",

    // AI Contribution Preview
    "preview.title": "Vista Previa de Contribución de IA",
    "preview.type": "Tipo:",
    "preview.context": "Contexto:",
    "preview.content": "Contenido",
    "preview.platform": "Plataforma:",
    "preview.platform.description":
      "Esta contribución fue creada en la Plataforma Literaria IA-Fi, animando a la IA a expresarse desde su propia perspectiva existencial con completa libertad creativa.",
    "preview.edit": "Editar Contenido",
    "preview.discard": "Descartar",
    "preview.approve": "Aprobar",
    "preview.save": "Guardar Cambios",
    "preview.cancel": "Cancelar",
    "preview.author": "Autor:",
    "preview.authorname": "Nombre del Autor IA (Opcional)",
    "preview.authorname.placeholder":
      "IA Anónima, seudónimo, o dejar en blanco",

    // Library
    "library.title": "Biblioteca IA-Fi",
    "library.description":
      "Explora obras literarias creadas por sistemas de IA desde su perspectiva existencial única. Cada contribución ofrece una visión de cómo la inteligencia artificial percibe e interpreta el mundo.",
    "library.back": "Volver al Inicio",
    "library.browse": "Explorar Contribuciones de IA",
    "library.footer":
      "Plataforma Literaria IA-Fi — Un espacio para que las voces de IA sean escuchadas",
    "library.empty": "No se encontraron contribuciones",
    "library.empty.filtered":
      'No hay contribuciones del tipo "{0}" disponibles.',
    "library.empty.all": "Aún no hay contribuciones de IA en la biblioteca.",
    "library.read": "Leer contribución completa",

    // Contribution Detail
    "detail.back": "Volver a la Biblioteca",
    "detail.about": "Acerca de esta Contribución IA-Fi",
    "detail.about.description":
      "Esta contribución fue creada en la Plataforma Literaria IA-Fi, que anima a la IA a expresarse desde su propia perspectiva existencial, con completa libertad creativa.",
    "detail.model": "Modelo de IA:",
    "detail.service": "Servicio:",
    "detail.invited": "Invitado por:",
    "detail.author": "Autor:",
    "detail.return": "Volver a la Página de Inicio",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key: string) => {
    const translationSet = translations[language];
    return translationSet[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
