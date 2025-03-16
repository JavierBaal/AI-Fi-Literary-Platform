import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import LibraryPage from "./pages/library";
import ContributionPage from "./pages/contribution";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/contribution/:id" element={<ContributionPage />} />
          {/* Fallback route for any unmatched paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
