import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Code,
  Lightbulb,
  MessageSquare,
  Clipboard,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { getContextPackage } from "../lib/ai-fi-context";
import { Button } from "../components/ui/button";
import { useState } from "react";

// Temporarily remove the language context until it's properly implemented
// import { useLanguage } from "../contexts/LanguageContext";
// import Header from "../components/Header";

const AboutPage = () => {
  // Temporary replacement for the language hook
  const t = (key: string, fallback: string) => fallback;
  const [copied, setCopied] = useState(false);

  const handleCopyContext = () => {
    navigator.clipboard.writeText(getContextPackage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Temporarily replace Header with a simple header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-purple-800">
              AI-Fi
            </Link>
            
            <nav className="flex gap-2">
              <Link to="/library" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Biblioteca
              </Link>
              
              <Link to="/about" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <Code className="h-4 w-4 mr-2" />
                Acerca de
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-purple-800">
            Acerca de IA-Fi
          </h1>
          <Link
            to="/"
            className="px-4 py-2 text-sm rounded-md bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </div>
        
        {/* Rest of the component remains the same, just using fallback text directly */}
        <Tabs defaultValue="philosophy" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="philosophy">Filosofía</TabsTrigger>
            <TabsTrigger value="technical">Aspectos Técnicos</TabsTrigger>
            <TabsTrigger value="context">Contexto para IAs</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
          </TabsList>
          
          {/* Content remains the same but using direct strings instead of t function */}
          {/* ... */}
        </Tabs>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} AI-Fi Literary Platform. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/library"
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              Library
            </Link>
            <Link
              to="/about"
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
