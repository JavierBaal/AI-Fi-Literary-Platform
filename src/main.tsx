import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Añadimos un console.log para verificar que este archivo se está ejecutando
console.log("Iniciando aplicación AI-Fi...")

// Verificamos que el elemento root existe
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error("No se encontró el elemento 'root' en el DOM")
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
