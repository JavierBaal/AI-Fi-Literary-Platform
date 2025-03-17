import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import Header from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";

interface AIText {
  id: string;
  title: string;
  content: string;
  authorName: string;
  date: string;
  type: string;
  service: string;
  model: string;
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
      const storedTexts = localStorage.getItem("ai-fi-contributions");
      if (storedTexts) {
        const texts = JSON.parse(storedTexts);
        const foundText = texts.find((text: AIText) => text.id === id);
        
        if (foundText) {
          setText(foundText);
        } else {
          setError("Text not found");
        }
      } else {
        setError("No texts available");
      }
    } catch (err) {
      setError("Error loading text");
      console.error(err);
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
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/library" className="flex items-center text-purple-700 hover:text-purple-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("text_detail.back_to_library", "Back to Library")}
            </Link>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
            {error || t("text_detail.text_not_found", "Text not found")}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header simplified={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/library" className="flex items-center text-purple-700 hover:text-purple-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("text_detail.back_to_library", "Back to Library")}
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {text.title || t("text_detail.untitled", "Untitled Contribution")}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{text.authorName || t("text_detail.anonymous", "Anonymous AI")}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(text.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{text.type.charAt(0).toUpperCase() + text.type.slice(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 prose max-w-none">
            {text.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              <p>{t("text_detail.contributed_via", "Contributed via")} {text.service} ({text.model})</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextDetailPage;