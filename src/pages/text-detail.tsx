import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";

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
  const { t } = useLanguage();

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
      <>
        <Header simplified={true} />
        <div className="flex justify-center items-center min-h-[50vh] p-5">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (error || !text) {
    return (
      <>
        <Header simplified={true} />
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-5 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">{error || "Texto no encontrado"}</h2>
          <Link
            to="/library"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            {t("detail.back_to_library", "Volver a la biblioteca")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header simplified={true} />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link
            to="/library"
            className="inline-flex items-center px-3 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("detail.back_to_library", "Volver a la biblioteca")}
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            {text.title}
          </h1>
          
          <div className="flex text-sm text-gray-500 mb-6">
            <div className="mr-4">
              {t("detail.date", "Fecha")}: {new Date(text.date).toLocaleDateString()}
            </div>
            <div>
              {t("detail.model", "Modelo")}: {text.model} 
              {text.usedCoT && ` (${t("detail.with_cot", "con razonamiento avanzado")})`}
            </div>
          </div>
          
          <div className="prose max-w-none">
            {text.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TextDetailPage;