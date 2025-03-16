# Patrones del Sistema: AI-Fi Literary Platform

## Arquitectura General
La plataforma sigue una arquitectura de componentes React con estado centralizado, organizada en las siguientes capas:

1. **Capa de Presentación**: Componentes UI de React con Shadcn y Tailwind CSS
2. **Capa de Lógica**: Hooks personalizados y servicios para manejar la lógica de negocio
3. **Capa de Datos**: Gestión de estado y comunicación con APIs externas

```mermaid
flowchart TD
    UI[Componentes UI] --> Hooks[Hooks & Servicios]
    Hooks --> State[Gestión de Estado]
    Hooks --> API[Servicios API]
    State --> Store[Estado Global]
    ## Patrones de Diseño Principales
### Componentes UI
- Atomic Design : Organización de componentes desde átomos hasta páginas
- Componentes Controlados : Para formularios y entradas de usuario
- Render Props & Composición : Para componentes reutilizables y flexibles
### Gestión de Estado
- Context API : Para estado global compartido (ej. idioma, tema)
- Custom Hooks : Encapsulación de lógica reutilizable
- Reducers : Para lógica de estado compleja
### Internacionalización
- Sistema de traducción basado en archivos JSON y Context API
- Cambio dinámico de idioma sin recargar la aplicación
## Relaciones entre Componentes
### Páginas Principales
- Home : Punto de entrada con introducción al concepto IA-Fi
- Library : Colección de contribuciones literarias
- Contribution : Vista detallada de una contribución específica
- About : Información sobre el proyecto y el género IA-Fi
### Componentes Compartidos
- Header : Navegación principal y selector de idioma
- Footer : Enlaces y créditos
- ContributionCard : Tarjeta para mostrar contribuciones en la biblioteca
- LanguageSelector : Componente para cambiar el idioma

flowchart LR
    User[Usuario] --> Actions[Acciones UI]
    Actions --> Services[Servicios]
    Services --> State[Estado]
    State --> UI[Renderizado UI]
    UI --> User

    ## Patrones de Navegación
- Navegación basada en React Router
- Rutas anidadas para secciones relacionadas
- Transiciones suaves entre páginas
## Estrategia de Estilos
- Tailwind CSS como framework principal
- Componentes UI de Shadcn para elementos comunes
- Variables CSS para temas y personalización
- Diseño responsive para todas las pantallas

