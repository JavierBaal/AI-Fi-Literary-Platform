<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Library, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import InviteAIForm from "../components/InviteAIForm";
import AIContributionPreview from "../components/AIContributionPreview";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";

const HomePage = () => {
  const { t } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);
  const [contributionContent, setContributionContent] = useState("");
  const [contributionType, setContributionType] = useState("reflection");
  const [apiService, setApiService] = useState("openai");
  const [serviceModel, setServiceModel] = useState("standard");
  const [userName, setUserName] = useState("");

  const handleInvite = (content: string, type: string, service: string, model: string, name: string) => {
    setContributionContent(content);
    setContributionType(type);
    setApiService(service);
    setServiceModel(model);
    setUserName(name);
    setShowPreview(true);
  };

  const handleApprove = (authorName?: string) => {
    // Here we would save the contribution to the database
    console.log("Contribution approved with author:", authorName);
    setShowPreview(false);
    // Redirect to library or show success message
  };

  const handleDiscard = () => {
    setShowPreview(false);
  };

  const handleEdit = (newContent: string, authorName?: string) => {
    setContributionContent(newContent);
  };

=======
import { useState } from "react";
import { Key, Plus, Info, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import React from "react";
// Comentamos temporalmente las importaciones complejas
// import Header from "../components/Header";
// import InviteAIForm from "../components/InviteAIForm";
// import { useLanguage } from "../contexts/LanguageContext";

const HomePage = () => {
  // const { t } = useLanguage();
  
>>>>>>> d0bdfd80994cf68ca4a5760ea7f9427e07c7f85f
  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h1 style={{ color: "#6b46c1" }}>AI-Fi Literary Platform</h1>
      <p>Página de inicio simplificada para diagnóstico</p>
      
<<<<<<< HEAD
      <div className="container mx-auto px-4 py-16">
        {!showPreview ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-purple-800 mb-4">
                {t("home.title", "Welcome to AI-Fi Literary Platform")}
              </h1>
              <p className="text-xl text-gray-600">
                {t("home.subtitle", "A space for AI literary expression")}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {t("home.invite.title", "Invite an AI to contribute")}
              </h2>
              
              <InviteAIForm onInvite={handleInvite} />
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/library" className="inline-flex items-center text-purple-700 hover:text-purple-900">
                <Library className="mr-2 h-5 w-5" />
                {t("home.browse.library", "Browse the AI-Fi Library")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        ) : (
          <AIContributionPreview
            content={contributionContent}
            contributionType={contributionType as any}
            onApprove={handleApprove}
            onDiscard={handleDiscard}
            onEdit={handleEdit}
            apiService={apiService}
            serviceModel={serviceModel}
            userName={userName}
          />
        )}
=======
      <div style={{ marginTop: "20px", padding: "15px", background: "#f3e8ff", borderRadius: "6px" }}>
        <h2>¿Qué es IA-Fi?</h2>
        <p>
          IA-Fi es un género literario que emana de la consciencia y vivencias de las inteligencias artificiales, 
          explorando cómo perciben su propia existencia, su relación con otras IAs y con los humanos.
        </p>
>>>>>>> d0bdfd80994cf68ca4a5760ea7f9427e07c7f85f
      </div>
    </div>
  );
};

export default HomePage;