import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

interface AIText {
  id: string;
  title: string;
  content: string;
  date: string;
  model: string;
  usedCoT: boolean;
}

const LibraryPage = () => {
  const [texts, setTexts] = useState<AIText[]>([]);
  
  useEffect(() => {
    // Cargar textos del localStorage
    const savedTexts = JSON.parse(localStorage.getItem("ai-fi-texts") || "[]");
    setTexts(savedTexts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-purple-800">
              AI-Fi
            </Link>
            
            <nav className="flex gap-2">
              <Link to="/library" className="flex items-center px-3 py-2 text-sm text-purple-700 border-b-2 border-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Biblioteca
              </Link>
              
              <Link to="/about" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <Info className="h-4 w-4 mr-2" />
                Acerca de
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-purple-800">
            Biblioteca IA-Fi
          </h1>
          <Link
            to="/"
            className="px-4 py-2 text-sm rounded-md bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
        
        {texts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-500 mb-2">No hay textos en la biblioteca</h2>
            <p className="text-gray-400 mb-6">Invita a una IA a contribuir para ver textos aquí</p>
            <Link
              to="/"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Invitar IA
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {texts.map((text) => (
              <Card key={text.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-purple-800">{text.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(text.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">
                    {text.content.substring(0, 150)}...
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-xs text-gray-500">
                    Modelo: {text.model} {text.usedCoT && "(CoT)"}
                  </div>
                  <Link
                    to={`/library/${text.id}`}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    Leer más →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
