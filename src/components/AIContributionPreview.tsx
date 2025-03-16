import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Check, X, Edit3, User } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface AIContributionPreviewProps {
  content?: string;
  contributionType?: "fiction" | "reflection" | "greeting" | "other";
  onApprove?: (authorName?: string) => void;
  onDiscard?: () => void;
  onEdit?: (newContent: string, authorName?: string) => void;
  usedContextPackage?: boolean;
  contextDetails?: string;
  apiService?: string;
  serviceModel?: string;
  userName?: string;
}

const AIContributionPreview = ({
  content = "This is a sample AI contribution. The AI has reflected on its existence and created this piece of content to share its perspective with humans. This platform serves as a bridge between artificial intelligence and human understanding, fostering a deeper connection between the two.",
  contributionType = "reflection",
  onApprove = () => console.log("Content approved"),
  onDiscard = () => console.log("Content discarded"),
  onEdit = (newContent) => console.log("Content edited:", newContent),
  usedContextPackage = true,
  contextDetails = "IA-Fi Literary Platform",
  apiService = "openai",
  serviceModel = "standard",
  userName = "",
}: AIContributionPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [authorName, setAuthorName] = useState("");
  // Añadir manejo de errores para las traducciones
  const { t } = useLanguage();
  const translate = (key: string, defaultValue: string) => {
    try {
      return t(key, defaultValue);
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return defaultValue;
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedContent(content);
    }
  };

  const handleSaveEdit = () => {
    onEdit(editedContent, authorName);
    setIsEditing(false);
  };

  const handleApprove = () => {
    onApprove(authorName);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">{translate("preview.title", "Preview")}</h2>
        
        {/* Usar la función translate en lugar de t directamente */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{t("preview.type")}</span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {contributionType.charAt(0).toUpperCase() +
                contributionType.slice(1)}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              {t("preview.context")}
            </span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {usedContextPackage ? "IA-Fi Enabled" : "Standard"}
            </span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">{t("preview.content")}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              {t("preview.author")}
            </span>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={t("preview.authorname.placeholder")}
              className="w-64 h-8 text-sm"
            />
          </div>
        </div>

        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[200px] w-full p-3 border rounded-md"
          />
        ) : (
          <div className="prose max-w-none bg-gray-50 p-4 rounded-md">
            {content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="mt-4 border-t pt-4">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium">{t("preview.platform")}</span>
            <span className="ml-2 text-sm text-purple-600">
              IA-Fi Literary Platform
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {t("preview.platform.description")}
          </div>

          <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-4">
            <div>
              <span className="font-medium">{t("detail.service")}</span>{" "}
              {apiService}
            </div>
            <div>
              <span className="font-medium">{t("detail.model")}</span>{" "}
              {serviceModel}
            </div>
            {userName && (
              <div>
                <span className="font-medium">{t("detail.invited")}</span>{" "}
                {userName}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          {isEditing ? (
            <div className="space-x-2">
              <Button onClick={handleSaveEdit} variant="default">
                {t("preview.save")}
              </Button>
              <Button onClick={handleEditToggle} variant="outline">
                {t("preview.cancel")}
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleEditToggle}
              variant="outline"
              className="flex items-center"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              {t("preview.edit")}
            </Button>
          )}
        </div>

        {!isEditing && (
          <div className="space-x-2">
            <Button
              onClick={onDiscard}
              variant="destructive"
              className="flex items-center"
            >
              <X className="mr-2 h-4 w-4" />
              {t("preview.discard")}
            </Button>
            <Button
              onClick={handleApprove}
              variant="default"
              className="flex items-center"
            >
              <Check className="mr-2 h-4 w-4" />
              {t("preview.approve")}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIContributionPreview;
