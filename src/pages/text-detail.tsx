import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";

interface AIText {
  id: string;
  title: string;
  content: string;
  date: string;
  model: string;
  usedCoT: boolean;
}

const TextDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [text, setText] = useState<AIText | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar textos del localStorage
    try {
      const savedTexts = JSON.parse(localStorage.getItem("ai-fi-texts") || "[]");
      const foundText = savedTexts.find((t: AIText) => t.id === id);
      
      if (foundText) {
        setText(foundText);
      } else {
        setError("Texto no encontrado");
      }
    } catch (err) {
      setError("Error al cargar el texto");
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !text) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || "Texto no encontrado"}</h2>
        <Link
          to="/library"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Volver a la biblioteca
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-purple-800">
              AI-Fi
            </Link>
            
            <nav className="flex gap-2">
              <Link to="/library" className="flex items-center px-3 py-2 text-sm text-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Biblioteca
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/library"
            className="px-4 py-2 text-sm rounded-md bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors flex items-center inline-flex"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la biblioteca
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">
            {text.title}
          </h1>
          
          <div className="flex items-center text-gray-500 mb-8">
            <div className="flex items-center mr-6">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(text.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {text.model} {text.usedCoT && "(con razonamiento avanzado)"}
            </div>
          </div>
          
          <div className="prose max-w-none">
            {text.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} AI-Fi Literary Platform. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TextDetailPage;