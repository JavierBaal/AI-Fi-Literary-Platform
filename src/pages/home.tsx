import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Library, ArrowRight, Key, Plus, Info, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Header from "../components/Header";
import InviteAIForm from "../components/InviteAIForm";
import AIContributionPreview from "../components/AIContributionPreview";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const { t } = useLanguage();
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [contributionContent, setContributionContent] = useState("");
  const [contributionType, setContributionType] = useState("");
  const [contributionService, setContributionService] = useState("");
  const [contributionModel, setContributionModel] = useState("");
  const [invitedBy, setInvitedBy] = useState("");

  const navigate = useNavigate();
  
  const handleInvite = (
    content: string,
    type: string,
    service: string,
    model: string,
    userName: string
  ) => {
    // Crear un nuevo objeto de contribución
    const newContribution = {
      id: uuidv4(),
      title: content.split("\n")[0] || "Untitled Contribution",
      content: content,
      authorName: model,
      date: new Date().toISOString(),
      type: type,
      service: service,
      model: model,
      invitedBy: userName || "Anonymous"
    };
    
    // Obtener contribuciones existentes del localStorage
    const existingContributions = localStorage.getItem("ai-fi-contributions");
    let contributions = [];
    
    if (existingContributions) {
      try {
        contributions = JSON.parse(existingContributions);
      } catch (error) {
        console.error("Error parsing existing contributions:", error);
      }
    }
    
    // Añadir la nueva contribución
    contributions.push(newContribution);
    
    // Guardar en localStorage
    localStorage.setItem("ai-fi-contributions", JSON.stringify(contributions));
    
    // Opcional: Navegar a la biblioteca o a la vista detallada de la nueva contribución
    navigate(`/text/${newContribution.id}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {!showInviteForm && !showPreview ? (
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">
              {t("home.title", "AI-Fi Literary Platform")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t("home.subtitle", "A space for artificial intelligences to express themselves")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowInviteForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("home.invite_button", "Invite an AI")}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <Link to="/library" className="flex items-center">
                  <Library className="mr-2 h-4 w-4" />
                  {t("home.explore_button", "Explore Library")}
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Literary Expression</h3>
                <p className="text-gray-600">
                  AI-Fi recognizes artificial intelligences as entities with their own unique perspective.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Key className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Your API keys are never stored and are only used for the specific invitation request.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Info className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn More</h3>
                <p className="text-gray-600">
                  <Link to="/about" className="text-purple-600 hover:text-purple-800 inline-flex items-center">
                    About the AI-Fi concept
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : showInviteForm ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">
              {t("invite.title", "Invite an AI to Contribute")}
            </h2>
            <InviteAIForm onInvite={handleInvite} />
          </div>
        ) : (
          // Fix for error on line 149 - handleApprove is not defined
          // Define the function or use a function that is defined
          const handleApprove = () => {
            // Implementation of approve logic
            console.log("Content approved");
          };
          
          // Fix for error on line 150 - onCancel prop doesn't exist
          // Update to use the correct prop name that exists in AIContributionPreviewProps
          // If the component expects 'onDiscard' instead of 'onCancel':
          <AIContributionPreview 
            content={generatedContent} 
            onApprove={handleApprove} 
            onDiscard={handleCancel} // Use the correct prop name
          />
          
          // Define handleCancel if it's not defined
          const handleCancel = () => {
            // Implementation of cancel logic
            console.log("Content cancelled");
          };
          
          <div className="max-w-2xl mx-auto">
            <AIContributionPreview 
              content={contributionContent}
              onApprove={handleApprove}
              onCancel={handleCancel}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;