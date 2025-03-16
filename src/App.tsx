import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LibraryPage from "./pages/library";
import AboutPage from "./pages/about";
import TextDetailPage from "./pages/text-detail";
import { LanguageProvider } from "./contexts/LanguageContext";
// Comentamos temporalmente el ToastProvider para ver si es la causa
// import { ToastProvider2 } from "./contexts/ToastContext";

function App() {
  return (
    <div style={{ padding: "20px", background: "#f0f0f0", minHeight: "100vh" }}>
      <h1>AI-Fi Platform - Debug Mode</h1>
      <LanguageProvider>
        {/* <ToastProvider2> */}
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/library/:id" element={<TextDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        {/* </ToastProvider2> */}
      </LanguageProvider>
    </div>
  );
}

export default App;
