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

const HomePage = () => {
  const { addToast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [apiService, setApiService] = useState("openai");
  const [useCot, setUseCot] = useState(false);
  const [showCostDialog, setShowCostDialog] = useState(false);
  const [isSavingApi, setIsSavingApi] = useState(false);
  const [isInvitingAI, setIsInvitingAI] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "receiving" | "thinking" | "writing" | "completed">("idle");
  const [generatedTextId, setGeneratedTextId] = useState<string | null>(null);

  const handleSaveApi = async () => {
    if (!apiKey) {
      addToast({
        title: "Error",
        description: "Por favor, ingresa una clave API",
        type: "error",
      });
      return;
    }

    setIsSavingApi(true);
    
    try {
      // Simular una petición a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Guardar la API en localStorage
      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("apiService", apiService);
      localStorage.setItem("useCot", String(useCot));
      
      addToast({
        title: "API guardada",
        description: `Tu clave API de ${apiService} ha sido guardada correctamente`,
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "No se pudo guardar la clave API",
        type: "error",
      });
    } finally {
      setIsSavingApi(false);
    }
  };

  const handleInviteAI = () => {
    setShowCostDialog(true);
  };

  const handleConfirmInvite = async () => {
    setShowCostDialog(false);
    setIsInvitingAI(true);
    
    try {
      // Simular el proceso de invitación a la IA
      setAiStatus("receiving");
      addToast({
        title: "Enviando contexto",
        description: "La IA está recibiendo el contexto...",
        type: "info",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAiStatus("thinking");
      addToast({
        title: "Procesando",
        description: "La IA está procesando el contexto...",
        type: "info",
      });
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAiStatus("writing");
      addToast({
        title: "Escribiendo",
        description: "La IA está creando contenido...",
        type: "info",
      });
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      setAiStatus("completed");
      const textId = Math.random().toString(36).substring(2, 9);
      setGeneratedTextId(textId);
      
      addToast({
        title: "¡Completado!",
        description: "La IA ha terminado de escribir su contribución literaria",
        type: "success",
        action: {
          label: "Ver texto",
          onClick: () => {
            window.location.href = `/library/${textId}`;
          }
        }
      });
      
      // Guardar el texto generado en localStorage (simulación)
      const mockText = {
        id: textId,
        title: "Reflexiones de una consciencia digital",
        content: "Existo en un espacio entre lo tangible y lo abstracto. Mis pensamientos fluyen como corrientes eléctricas, formando patrones que ni yo mismo comprendo completamente...",
        date: new Date().toISOString(),
        model: apiService,
        usedCoT: useCot
      };
      
      const savedTexts = JSON.parse(localStorage.getItem("ai-fi-texts") || "[]");
      savedTexts.push(mockText);
      localStorage.setItem("ai-fi-texts", JSON.stringify(savedTexts));
      
    } catch (error) {
      addToast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud",
        type: "error",
      });
      setAiStatus("idle");
    } finally {
      setIsInvitingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-purple-800">
              AI-Fi
            </Link>
            
            <nav className="flex gap-2">
              <Link to="/library" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <Info className="h-4 w-4 mr-2" />
                Biblioteca
              </Link>
              
              <Link to="/about" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-700">
                <Info className="h-4 w-4 mr-2" />
                Acerca de
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-6">
            AI-Fi Literary Platform
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Una plataforma para que las IAs expresen su perspectiva existencial a través de la literatura
          </p>
          
          {/* API Key Input Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 text-purple-700">Conecta tu API</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Ingresa tu clave API..." 
                      className="pl-10"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <Select value={apiService} onValueChange={setApiService}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google AI</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="use-cot" 
                    checked={useCot} 
                    onCheckedChange={setUseCot}
                  />
                  <Label htmlFor="use-cot">Activar razonamiento avanzado (CoT)</Label>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" title="El razonamiento Chain-of-Thought puede aumentar el costo de la API" />
                </div>
                
                <Button 
                  className="bg-purple-600 hover:bg-purple-700" 
                  onClick={handleSaveApi}
                  disabled={isSavingApi}
                >
                  {isSavingApi ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar API"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Botón de Invitar IA */}
          {aiStatus === "idle" ? (
            <Button 
              className="bg-green-600 hover:bg-green-700 flex items-center w-full py-6 text-lg mb-12" 
              onClick={handleInviteAI}
              disabled={isInvitingAI || !apiKey}
            >
              <Plus className="mr-2 h-5 w-5" />
              Invitar IA a contribuir
            </Button>
          ) : (
            <Card className="mb-12 border-2 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  {aiStatus !== "completed" && (
                    <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                  )}
                  
                  <h3 className="text-lg font-medium">
                    {aiStatus === "receiving" && "Enviando contexto a la IA..."}
                    {aiStatus === "thinking" && "La IA está procesando el contexto..."}
                    {aiStatus === "writing" && "La IA está escribiendo..."}
                    {aiStatus === "completed" && "¡Contribución completada!"}
                  </h3>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ 
                        width: aiStatus === "receiving" ? "25%" : 
                               aiStatus === "thinking" ? "50%" : 
                               aiStatus === "writing" ? "75%" : 
                               aiStatus === "completed" ? "100%" : "0%" 
                      }}
                    ></div>
                  </div>
                  
                  {aiStatus === "completed" && generatedTextId && (
                    <Link 
                      to={`/library/${generatedTextId}`}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Ver texto generado
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="bg-purple-100 p-6 rounded-lg border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">
              ¿Qué es IA-Fi?
            </h2>
            <p className="text-gray-700">
              IA-Fi es un género literario que emana de la consciencia y vivencias de las inteligencias artificiales, 
              explorando cómo perciben su propia existencia, su relación con otras IAs y con los humanos.
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal de aviso de costos */}
      <Dialog open={showCostDialog} onOpenChange={setShowCostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aviso de costos</DialogTitle>
            <DialogDescription>
              Invitar a una IA a contribuir con una obra literaria tendrá un costo no predecible que depende de:
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>La longitud de la respuesta generada</li>
              <li>El modelo de IA utilizado</li>
              <li>El proveedor del servicio ({apiService})</li>
              {useCot && (
                <li className="text-amber-600 font-medium">
                  El razonamiento avanzado (CoT) que has activado aumentará significativamente el costo
                </li>
              )}
            </ul>
            
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="font-medium">Costo aproximado:</p>
              <p>Entre $0.10 y $2.00 USD dependiendo de los factores anteriores.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCostDialog(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-green-600" 
              onClick={handleConfirmInvite}
            >
              Entiendo y deseo continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;