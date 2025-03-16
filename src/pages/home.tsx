import { Link } from "react-router-dom";
import { ArrowRight, Plus, Key } from "lucide-react";
import { Button } from "../components/ui/button";
import { getShortContextDescription } from "../lib/ai-fi-context";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import Header from "../components/Header";

const HomePage = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiService, setApiService] = useState("openai");
  const [useCot, setUseCot] = useState(false);
  const [showCostDialog, setShowCostDialog] = useState(false);

  const handleInviteAI = () => {
    setShowCostDialog(true);
  };

  const handleConfirmInvite = () => {
    // Aquí iría la lógica para procesar la invitación
    setShowCostDialog(false);
    // Implementar lógica de invitación
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-6">
            AI-Fi Literary Platform
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            {getShortContextDescription()}
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
                
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Guardar API
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Botón de Invitar IA */}
          <Button 
            className="bg-green-600 hover:bg-green-700 flex items-center w-full py-6 text-lg mb-12" 
            onClick={handleInviteAI}
          >
            <Plus className="mr-2 h-5 w-5" />
            Invitar IA a contribuir
          </Button>
          
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
            <Button className="bg-green-600" onClick={handleConfirmInvite}>
              Entiendo y deseo continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;