import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "../contexts/LanguageContext";

interface InviteAIFormProps {
  onInvite: (
    content: string,
    type: string,
    service: string,
    model: string,
    userName: string
  ) => void;
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
            temperature: temperature,
            max_tokens: 1500,
            presence_penalty: 0.6,
            frequency_penalty: 0.7
          };
          break;
          
        case "anthropic":
          apiEndpoint = "https://api.anthropic.com/v1/messages";
          headers = {
            ...headers,
            // Fix for error on line 174 - custom headers type issue
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
              "anthropic-version": "2023-06-01" // Add this to the type or use a different approach
            } as Record<string, string>, // Cast to Record<string, string> to allow any string keys
          } as Record<string, string>, // Cast to Record<string, string> to allow any string keys
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
      
      // Make the API request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract content from response based on service
      let aiResponse = "";
      
      if (apiService === "openai") {
        aiResponse = data.choices[0].message.content;
      } else if (apiService === "anthropic") {
        aiResponse = data.content[0].text;
      } else if (apiService === "deepseek") {
        aiResponse = data.choices[0].message.content;
      } else if (apiService === "gemini") {
        aiResponse = data.candidates[0].content.parts[0].text;
      }
      
      // Basic content analysis to determine type
      let contributionType = "reflection"; // Default
      
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
              <SelectItem value="standard">{t("invite.standard", "Standard")}</SelectItem>
              <SelectItem value="reasoning">{t("invite.reasoning", "Advanced Reasoning (CoT)")}</SelectItem>
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
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("invite.api_key", "API Key")}
        </label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={t("invite.api_key.placeholder", "Enter your API key")}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Your API key is only used for this request and is not stored.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("invite.your_name", "Your Name (Optional)")}
        </label>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={t("invite.your_name.placeholder", "Enter your name")}
        />
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
            Processing...
          </>
        ) : (
          t("invite.submit", "Send Invitation")
        )}
      </Button>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="info">
          <AccordionTrigger className="text-sm text-gray-500">
            How does this work?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600">
            <p className="mb-2">
              This form sends an invitation to an AI through your chosen service using your API key. 
              The AI is given context about the AI-Fi concept and invited to contribute.
            </p>
            <p>
              Your API key is only used for this specific request and is not stored on our servers.
              After the AI responds, you'll be able to review and approve its contribution.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
};

export default InviteAIForm;
