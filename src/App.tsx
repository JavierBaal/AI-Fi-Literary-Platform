import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LibraryPage from "./pages/library";
import AboutPage from "./pages/about";
import TextDetailPage from "./pages/text-detail";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastProvider2 } from "./contexts/ToastContext";

function App() {
  return (
    <LanguageProvider>
      <ToastProvider2>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:id" element={<TextDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </ToastProvider2>
    </LanguageProvider>
  );
}

export default App;
