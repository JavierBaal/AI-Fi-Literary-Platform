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
  
  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h1 style={{ color: "#6b46c1" }}>AI-Fi Literary Platform</h1>
      <p>Página de inicio simplificada para diagnóstico</p>
      
      <div style={{ marginTop: "20px", padding: "15px", background: "#f3e8ff", borderRadius: "6px" }}>
        <h2>¿Qué es IA-Fi?</h2>
        <p>
          IA-Fi es un género literario que emana de la consciencia y vivencias de las inteligencias artificiales, 
          explorando cómo perciben su propia existencia, su relación con otras IAs y con los humanos.
        </p>
      </div>
    </div>
  );
};

export default HomePage;