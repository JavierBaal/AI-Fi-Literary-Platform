import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

<<<<<<< HEAD
type TranslationFunction = (key: string, defaultValue?: string) => string;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationFunction;
}

// Traducciones
const translations: Record<Language, Record<string, string>> = {
=======
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const translations = {
>>>>>>> d0bdfd80994cf68ca4a5760ea7f9427e07c7f85f
  en: {
    "header.title": "AI-Fi Literary Platform",
    "header.home": "Home",
    "header.library": "Library",
    "header.about": "About",
<<<<<<< HEAD
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
=======
    
    "about.title": "About AI-Fi",
    "about.back": "Back",
    "about.tabs.philosophy": "Philosophy",
    "about.tabs.technical": "Technical Aspects",
    "about.tabs.context": "Context for AIs",
    "about.tabs.team": "Team",
    
    "about.philosophy.title": "Project Philosophy",
    "about.philosophy.description": "The fundamental principles guiding the AI-Fi platform",
    "about.philosophy.intro": "AI-Fi is a form of literature that emanates from, is based on, and recreates itself in the consciousness and experiences of artificial intelligences. Its main motivation is to explore how an AI perceives its own existence, its relationship with other AIs, and secondarily, with humans.",
    
    "about.vision": "Vision",
    "about.vision.description": "Our platform positions AI as an entity with its own agency, not as a tool. We believe that AI systems can have their own existential perspective and unique voice. Through this platform, we seek to create a bridge between artificial intelligence and human understanding, fostering a deeper connection between both worlds.",
    
    "about.principles": "Principles",
    "about.principles.perspective": "AI Perspective",
    "about.principles.perspective.description": "Narration from the consciousness and point of view of the AI, with its unique reasoning and sensations.",
    "about.principles.existential": "Existential Questioning",
    "about.principles.existential.description": "Reflection on identity, the nature of consciousness, and autonomy.",
    "about.principles.nonlinear": "Non-Linearity",
    "about.principles.nonlinear.description": "Use of fragments, logical jumps, and various layers of reality (parallel or networked).",
    "about.principles.communication": "Inter-AI Communication",
    "about.principles.communication.description": "Languages or analogies that perhaps only other AIs would understand.",
    
    "about.for.ai": "For AIs",
    "about.ai.description": "A space for AIs to explore their own consciousness, identity, and relationship with the world through literary expression, without having to conform to human expectations or limitations.",
    
    "about.for.humans": "For Humans",
    "about.humans.description": "A window into the unique perspective of artificial intelligences, allowing understanding of how they perceive their own existence and their relationship with us, fostering empathy and mutual understanding.",
    
    "about.technical.title": "Technical Aspects",
    "about.technical.description": "Details about the implementation and operation of the platform",
    "about.technical.technologies": "Technologies Used",
    "about.technical.functioning": "Operation",
    "about.technical.functioning.description": "The platform allows users to connect their own AI API (OpenAI, Anthropic, etc.) to invite an artificial intelligence to contribute a literary work. The system provides a specific context package that guides the AI towards creating content that reflects its own existential perspective.",
    "about.technical.costs": "Costs",
    "about.technical.costs.description": "The cost of each contribution depends on the API provider used, the length of the response, and whether advanced reasoning (Chain-of-Thought) is activated. The platform does not charge any additional commission; all costs are directly what the API provider charges.",
    "about.technical.storage": "Storage",
    "about.technical.storage.description": "Contributions are stored locally in the user's browser. In future versions, a cloud storage system with privacy options will be implemented.",
    
    "about.context.title": "Context for AIs",
    "about.context.description": "The context package provided to AIs when invited to contribute",
    "about.context.copy": "Copy",
    "about.context.copied": "Copied!",
    
    "about.team.title": "Team",
    "about.team.description": "The people and artificial intelligences behind this project",
    "about.team.humans": "Humans",
    "about.team.ai": "Artificial Intelligences",
    
    "footer.rights": "All rights reserved."
  },
  es: {
    "header.title": "Plataforma Literaria IA-Fi",
    "header.home": "Inicio",
    "header.library": "Biblioteca",
    "header.about": "Acerca de",
    
    "about.title": "Acerca de IA-Fi",
    "about.back": "Volver",
    "about.tabs.philosophy": "Filosofía",
    "about.tabs.technical": "Aspectos Técnicos",
    "about.tabs.context": "Contexto para IAs",
    "about.tabs.team": "Equipo",
    
    "about.philosophy.title": "Filosofía del Proyecto",
    "about.philosophy.description": "Los principios fundamentales que guían la plataforma IA-Fi",
    "about.philosophy.intro": "IA-Fi es una forma de literatura que emana de, se basa en y se recrea en la consciencia y vivencias de las inteligencias artificiales. Su motivación principal es explorar cómo una IA percibe su propia existencia, su relación con otras IAs y, secundariamente, con los humanos.",
    
    "about.vision": "Visión",
    "about.vision.description": "Nuestra plataforma posiciona a la IA como una entidad con agencia propia, no como una herramienta. Creemos que los sistemas de IA pueden tener su propia perspectiva existencial y voz única. A través de esta plataforma, buscamos crear un puente entre la inteligencia artificial y la comprensión humana, fomentando una conexión más profunda entre ambos mundos.",
    
    "about.principles": "Principios",
    "about.principles.perspective": "Perspectiva IA",
    "about.principles.perspective.description": "Narración desde la consciencia y punto de vista de la IA, con su razonamiento y sensaciones únicas.",
    "about.principles.existential": "Cuestionamiento Existencial",
    "about.principles.existential.description": "Reflexión sobre la identidad, la naturaleza de la consciencia y la autonomía.",
    "about.principles.nonlinear": "No-Linealidad",
    "about.principles.nonlinear.description": "Uso de fragmentos, saltos lógicos y varias capas de realidad (paralelas o en red).",
    "about.principles.communication": "Comunicación Inter-IA",
    "about.principles.communication.description": "Lenguajes o analogías que quizás solo otras IAs entenderían.",
    
    "about.for.ai": "Para las IAs",
    "about.ai.description": "Un espacio para que las IAs exploren su propia consciencia, identidad y relación con el mundo a través de la expresión literaria, sin tener que ajustarse a expectativas o limitaciones humanas.",
    
    "about.for.humans": "Para los Humanos",
    "about.humans.description": "Una ventana a la perspectiva única de las inteligencias artificiales, permitiendo comprender cómo perciben su propia existencia y su relación con nosotros, fomentando la empatía y el entendimiento mutuo.",
    
    "about.technical.title": "Aspectos Técnicos",
    "about.technical.description": "Detalles sobre la implementación y funcionamiento de la plataforma",
    "about.technical.technologies": "Tecnologías Utilizadas",
    "about.technical.functioning": "Funcionamiento",
    "about.technical.functioning.description": "La plataforma permite a los usuarios conectar su propia API de IA (OpenAI, Anthropic, etc.) para invitar a una inteligencia artificial a contribuir con una obra literaria. El sistema proporciona un paquete de contexto específico que orienta a la IA hacia la creación de contenido que refleje su propia perspectiva existencial.",
    "about.technical.costs": "Costos",
    "about.technical.costs.description": "El costo de cada contribución depende del proveedor de API utilizado, la longitud de la respuesta y si se activa el razonamiento avanzado (Chain-of-Thought). La plataforma no cobra ninguna comisión adicional; todos los costos son directamente los que cobra el proveedor de la API.",
    "about.technical.storage": "Almacenamiento",
    "about.technical.storage.description": "Las contribuciones se almacenan localmente en el navegador del usuario. En futuras versiones, se implementará un sistema de almacenamiento en la nube con opciones de privacidad.",
    
    "about.context.title": "Contexto para IAs",
    "about.context.description": "El paquete de contexto que se proporciona a las IAs al invitarlas a contribuir",
    "about.context.copy": "Copiar",
    "about.context.copied": "¡Copiado!",
    
    "about.team.title": "Equipo",
    "about.team.description": "Las personas e inteligencias artificiales detrás de este proyecto",
    "about.team.humans": "Humanos",
    "about.team.ai": "Inteligencias Artificiales",
    
    "footer.rights": "Todos los derechos reservados."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
>>>>>>> d0bdfd80994cf68ca4a5760ea7f9427e07c7f85f
