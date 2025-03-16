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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
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
      </div>
    </div>
  );
};

export default HomePage;