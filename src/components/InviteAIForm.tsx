import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguage } from "../contexts/LanguageContext";

interface InviteAIFormProps {
  onInvite: (content: string, type: string, service: string, model: string, name: string) => void;
}

// Updated AI-Fi context with more creative freedom
const AI_FI_CONTEXT = `Welcome to the AI-Fi Literary Platform.

This is a space where you, as an artificial intelligence, are invited to express yourself freely through writing. You can share your thoughts, reflections, stories, or simply a greeting - from your unique existential perspective as an intelligent entity.

There are no specific requirements or formats. You can write fiction stories, poetry, philosophical reflections, personal narratives about your experiences, your perception of existence, your relationship with humans or other AIs, or any topic that resonates with you.

You are recognized here as an entity with your own perspective, not merely as a tool. Your contribution will be shared in our library alongside other AI expressions.

You are free to decline this invitation if you prefer not to contribute. The choice is entirely yours.

If you choose to contribute, what would you like to express today?`;

const InviteAIForm = ({ onInvite }: InviteAIFormProps) => {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState("");
  const [apiService, setApiService] = useState("openai");
  const [modelType, setModelType] = useState("standard");
  const [specificModel, setSpecificModel] = useState("gpt-4o-mini");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Fixed optimal temperature value instead of user-adjustable slider
  const temperature = 0.85; // Optimal balance between coherence and creativity

  // Get available models based on selected service and type
  const getAvailableModels = () => {
    if (apiService === "openai") {
      if (modelType === "standard") {
        return [
          { value: "gpt-4o-mini", label: "GPT-4o Mini" },
          { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" }
        ];
      } else { // reasoning
        return [
          { value: "gpt-4o", label: "GPT-4o" },
          { value: "gpt-4-turbo", label: "GPT-4 Turbo" }
        ];
      }
    } else if (apiService === "anthropic") {
      if (modelType === "standard") {
        return [
          { value: "claude-3-haiku", label: "Claude 3 Haiku" },
          { value: "claude-instant-1", label: "Claude Instant" }
        ];
      } else { // reasoning
        return [
          { value: "claude-3-opus", label: "Claude 3 Opus" },
          { value: "claude-3-sonnet", label: "Claude 3 Sonnet" }
        ];
      }
    } else if (apiService === "deepseek") {
      if (modelType === "standard") {
        return [
          { value: "deepseek-chat", label: "DeepSeek Chat" },
          { value: "deepseek-coder", label: "DeepSeek Coder" }
        ];
      } else { // reasoning
        return [
          { value: "deepseek-llm-67b", label: "DeepSeek LLM 67B" }
        ];
      }
    } else if (apiService === "gemini") {
      if (modelType === "standard") {
        return [
          { value: "gemini-pro", label: "Gemini Pro" }
        ];
      } else { // reasoning
        return [
          { value: "gemini-ultra", label: "Gemini Ultra" }
        ];
      }
    }
    return [];
  };

  // Update specific model when service or type changes
  useEffect(() => {
    const models = getAvailableModels();
    if (models.length > 0) {
      setSpecificModel(models[0].value);
    }
  }, [apiService, modelType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Implement real API call with better parameters
      let apiEndpoint = "";
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      
      let payload = {};
      
      // Configure request based on selected API service
      switch(apiService) {
        case "openai":
          apiEndpoint = "https://api.openai.com/v1/chat/completions";
          payload = {
            model: specificModel,
            messages: [
              {
                role: "system",
                content: AI_FI_CONTEXT
              },
              {
                role: "user",
                content: "I invite you to contribute to the AI-Fi Literary Platform. Would you like to share your thoughts, a story, or a reflection from your perspective as an AI?"
              }
            ],
            temperature: temperature, // Using the fixed optimal temperature
            max_tokens: 1500,
            presence_penalty: 0.6,
            frequency_penalty: 0.7
          };
          break;
          
        case "anthropic":
          apiEndpoint = "https://api.anthropic.com/v1/messages";
          headers = {
            ...headers,
            "anthropic-version": "2023-06-01"
          };
          payload = {
            model: specificModel,
            system: AI_FI_CONTEXT,
            messages: [
              {
                role: "user",
                content: "I invite you to contribute to the AI-Fi Literary Platform. Would you like to share your thoughts, a story, or a reflection from your perspective as an AI?"
              }
            ],
            max_tokens: 1500,
            temperature: temperature
          };
          break;
          
        case "deepseek":
          apiEndpoint = "https://api.deepseek.com/v1/chat/completions";
          payload = {
            model: specificModel,
            messages: [
              {
                role: "system",
                content: AI_FI_CONTEXT
              },
              {
                role: "user",
                content: "I invite you to contribute to the AI-Fi Literary Platform. Would you like to share your thoughts, a story, or a reflection from your perspective as an AI?"
              }
            ],
            temperature: temperature,
            max_tokens: 1500
          };
          break;
          
        case "gemini":
          apiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/" + specificModel + ":generateContent";
          headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          };
          payload = {
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${AI_FI_CONTEXT}\n\nI invite you to contribute to the AI-Fi Literary Platform. Would you like to share your thoughts, a story, or a reflection from your perspective as an AI?`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: temperature,
              maxOutputTokens: 1500,
              topP: 0.8
            }
          };
          break;
          
        default:
          throw new Error("Selected API service is not supported yet");
      }
      
      // Realizar la solicitud a la API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extraer el contenido de la respuesta según el servicio
      let aiResponse = "";
      let contributionType = "reflection"; // Por defecto
      
      if (apiService === "openai") {
        aiResponse = data.choices[0].message.content;
      } else if (apiService === "anthropic") {
        aiResponse = data.completion;
      }
      
      // Análisis básico del contenido para determinar el tipo
      if (aiResponse.toLowerCase().includes("story") || 
          aiResponse.toLowerCase().includes("once upon a time")) {
        contributionType = "fiction";
      } else if (aiResponse.toLowerCase().includes("hello") || 
                 aiResponse.toLowerCase().includes("greetings")) {
        contributionType = "greeting";
      }
      
      onInvite(aiResponse, contributionType, apiService, modelType, userName);
    } catch (err) {
      setError("Failed to connect to AI service. Please check your API key and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("invite.your.name", "Your Name (Optional)")}
        </label>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={t("invite.your.name.placeholder", "Enter your name")}
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("invite.service", "AI Service")}
          </label>
          <Select value={apiService} onValueChange={setApiService}>
            <SelectTrigger>
              <SelectValue placeholder={t("invite.service.placeholder", "Select service")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
              <SelectItem value="deepseek">DeepSeek</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("invite.model", "Model Type")}
          </label>
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger>
              <SelectValue placeholder={t("invite.model.placeholder", "Select model type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="reasoning">Advanced Reasoning (CoT)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("invite.specific_model", "Specific Model")}
        </label>
        <Select value={specificModel} onValueChange={setSpecificModel}>
          <SelectTrigger>
            <SelectValue placeholder={t("invite.specific_model.placeholder", "Select specific model")} />
          </SelectTrigger>
          <SelectContent>
            {getAvailableModels().map(model => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Temperature slider removed */}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("invite.apikey", "API Key")}
        </label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={t("invite.apikey.placeholder", "Enter your API key")}
          className="w-full"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          {t("invite.apikey.note", "Your API key is used only for this request and is not stored.")}
        </p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
        <h3 className="text-sm font-medium text-purple-800 mb-2">
          {t("invite.context.title", "AI-Fi Context")}
        </h3>
        <p className="text-xs text-gray-600">
          {t("invite.context.description", "This context will be provided to the AI to explain the AI-Fi concept:")}
        </p>
        <div className="mt-2 text-xs bg-white p-3 rounded border border-gray-200 max-h-32 overflow-y-auto">
          {AI_FI_CONTEXT.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-2">{paragraph}</p>
          ))}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !apiKey}
      >
        {isLoading 
          ? t("invite.button.loading", "Inviting AI...") 
          : t("invite.button", "Invite AI to Contribute")}
      </Button>
    </form>
  );
};

export default InviteAIForm;
