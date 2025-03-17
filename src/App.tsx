import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LibraryPage from './pages/library';
import AboutPage from './pages/about';
import TextDetailPage from './pages/text-detail';
import { LanguageProvider } from './contexts/LanguageContext';
import { restoreInitialContributions } from './utils/restoreContributions';

function App() {
  useEffect(() => {
    // Restore initial contributions when the app loads
    restoreInitialContributions();
  }, []);

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/text/:id" element={<TextDetailPage />} />
          </Routes>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
