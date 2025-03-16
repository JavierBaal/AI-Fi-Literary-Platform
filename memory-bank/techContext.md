
# Contexto Técnico: AI-Fi Literary Platform

## Stack Tecnológico

### Frontend
- **Framework**: React 18+
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: Shadcn UI
- **Routing**: React Router
- **Iconos**: Lucide React

### Herramientas de Desarrollo
- **Linting**: ESLint
- **Formateo**: Prettier
- **Documentación de Componentes**: Storybook
- **Herramientas de Diseño**: Tempo

## Configuración del Entorno de Desarrollo

### Requisitos Previos
- Node.js 16+
- npm o yarn
- Git

### Comandos Principales
```bash
# Instalación de dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar Storybook
npm run storybook

AI-Fi-Literary-Platform/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── ui/          # Componentes UI de Shadcn
│   ├── lib/             # Utilidades y funciones
│   ├── pages/           # Componentes de página
│   ├── stories/         # Historias de Storybook
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Punto de entrada
├── .eslintrc.js         # Configuración de ESLint
├── tailwind.config.js   # Configuración de Tailwind
├── tsconfig.json        # Configuración de TypeScript
└── vite.config.ts       # Configuración de Vite

## Dependencias Principales
### Producción
- react, react-dom: Biblioteca principal de UI
- react-router-dom: Enrutamiento
- tailwindcss: Framework de CSS
- lucide-react: Iconos
- clsx, tailwind-merge: Utilidades para clases CSS
### Desarrollo
- typescript: Tipado estático
- vite: Herramienta de construcción
- @storybook/react: Documentación de componentes
- tempo-devtools: Herramientas de diseño
## Patrones de Código
### Convenciones de Nombrado
- PascalCase para componentes React
- camelCase para funciones y variables
- UPPER_CASE para constantes
### Estructura de Componentes
- Componentes funcionales con hooks
- Props tipadas con TypeScript
- Uso de destructuring para props
### Manejo de Estilos
- Clases de Tailwind para estilos
- Función cn() para combinar clases condicionales
- Componentes de Shadcn para UI consistente
## Consideraciones Técnicas
- Soporte para múltiples idiomas
- Diseño responsive para todas las pantallas
- Accesibilidad (WCAG 2.1)
- Optimización de rendimiento