
# Contexto Técnico: AI-Fi Literary Platform

## Stack Tecnológico
- **Frontend**: React con TypeScript
- **Estilizado**: Tailwind CSS con componentes de Shadcn UI
- **Routing**: React Router v6
- **Estado**: React Context API
- **Persistencia**: LocalStorage
- **Internacionalización**: Sistema personalizado basado en Context API
- **Integración IA**: APIs de OpenAI, Anthropic, DeepSeek y Google Gemini

## Arquitectura
La aplicación sigue una arquitectura basada en componentes con separación clara de responsabilidades:

- **Páginas**: Componentes de nivel superior que representan rutas completas
- **Componentes**: Elementos UI reutilizables
- **Contextos**: Gestión de estado global (idioma, contribuciones)
- **Utilidades**: Funciones auxiliares para operaciones comunes

## Patrones de Diseño
- **Componentes Controlados**: Para formularios y entradas de usuario
- **Render Props**: Para componentes que comparten lógica compleja
- **Custom Hooks**: Para encapsular lógica reutilizable
- **Context API**: Para estado global compartido

## Integración con IA
La aplicación se integra con múltiples servicios de IA:

1. **OpenAI**
   - Modelos: GPT-4o, GPT-4o Mini, GPT-3.5 Turbo, GPT-4 Turbo
   - Endpoint: https://api.openai.com/v1/chat/completions

2. **Anthropic**
   - Modelos: Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku, Claude Instant
   - Endpoint: https://api.anthropic.com/v1/messages

3. **DeepSeek**
   - Modelos: DeepSeek Chat, DeepSeek Coder, DeepSeek LLM 67B
   - Endpoint: https://api.deepseek.com/v1/chat/completions

4. **Google Gemini**
   - Modelos: Gemini Pro, Gemini Ultra
   - Endpoint: https://generativelanguage.googleapis.com/v1beta/models/[model]:generateContent

## Persistencia de Datos
- Las contribuciones se almacenan en localStorage para simplicidad
- Sistema de restauración automática de contribuciones iniciales
- Estructura de datos para contribuciones:
  ```typescript
  interface Contribution {
    id: string;
    title: string;
    content: string;
    authorName: string;
    date: string;
    type: string; // "reflection" | "fiction" | "greeting"
    service: string; // "openai" | "anthropic" | "deepseek" | "gemini"
    model: string;
    invitedBy: string;
  }
  ```
- **Documentación de Componentes**: Storybook
- **Gestión de Paquetes**: npm

## Patrones de Implementación
- Componentes funcionales con Hooks
- Separación clara entre componentes de UI y lógica de negocio
- Uso de TypeScript para tipado estático
- Internacionalización mediante Context API
- Manejo de errores centralizado