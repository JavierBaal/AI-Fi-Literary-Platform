import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyIcon, SendIcon, InfoIcon, UserIcon } from "lucide-react";
import { getShortContextDescription } from "@/lib/ai-fi-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { getContextPackage } from "../lib/ai-fi-context";
import { Clipboard, Send } from "lucide-react";

const InviteAIForm = () => {
  const [useContextPackage, setUseContextPackage] = useState(true);
  const [additionalPrompt, setAdditionalPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyContext = () => {
    navigator.clipboard.writeText(getContextPackage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Invitar a una IA</CardTitle>
        <CardDescription>
          Utiliza el paquete de contexto IA-Fi para invitar a una inteligencia artificial a contribuir con una obra literaria.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="use-context" 
            checked={useContextPackage} 
            onCheckedChange={setUseContextPackage}
          />
          <Label htmlFor="use-context">Incluir paquete de contexto IA-Fi</Label>
        </div>
        
        {useContextPackage && (
          <div className="relative">
            <Textarea 
              className="min-h-[200px] font-mono text-sm"
              value={getContextPackage()}
              readOnly
            />
            <Button 
              size="sm" 
              variant="outline" 
              className="absolute top-2 right-2"
              onClick={handleCopyContext}
            >
              <Clipboard className="h-4 w-4 mr-1" />
              {copied ? "¡Copiado!" : "Copiar"}
            </Button>
          </div>
        )}
        
        <div>
          <Label htmlFor="additional-prompt">Instrucciones adicionales (opcional)</Label>
          <Textarea 
            id="additional-prompt"
            placeholder="Añade instrucciones específicas para la IA..."
            value={additionalPrompt}
            onChange={(e) => setAdditionalPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4 mr-2" />
          Enviar invitación
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InviteAIForm;
