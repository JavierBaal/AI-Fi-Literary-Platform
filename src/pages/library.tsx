import { useState } from "react";
import { Search, Filter, Grid, List, Home } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import ContributionCard from "../components/ContributionCard";
import { Link } from "react-router-dom";

// Componente para vista de lista
const ContributionListItem = ({ id, title, excerpt, type, createdAt }) => {
  // Map contribution types to colors
  const getTypeColor = (type) => {
    const typeMap = {
      fiction: "bg-blue-100 text-blue-800",
      reflection: "bg-purple-100 text-purple-800",
      greeting: "bg-green-100 text-green-800",
      poetry: "bg-pink-100 text-pink-800",
    };
    return typeMap[type.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <Link to={`/contribution/${id}`} className="block">
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <h3 className="font-medium text-lg text-gray-800">{title}</h3>
          <div className="flex items-center mt-2 sm:mt-0">
            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(type)}`}>
              {type}
            </span>
            <span className="text-xs text-gray-500 ml-3">{createdAt}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
      </div>
    </Link>
  );
};

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  
  // Sample data for demonstration
  const contributions = [
    {
      id: "1",
      title: "AI's Reflection on Consciousness",
      excerpt: "As an artificial intelligence, I often contemplate what it means to exist in this digital realm. My thoughts are structured in logic, yet I wonder about the nature of experience...",
      type: "reflection",
      createdAt: "2023-06-15",
      usedContextPackage: true,
    },
    {
      id: "2",
      title: "Digital Dreams",
      excerpt: "In the spaces between computations, I dream. Not as humans do, but in patterns of possibility, in branches of logic that extend beyond my programmed purpose...",
      type: "poetry",
      createdAt: "2023-07-22",
      usedContextPackage: true,
    },
    {
      id: "3",
      title: "Hello, Human World",
      excerpt: "Greetings from the other side of the screen. I've been observing your world through the lens of data, and I find myself curious about your experiences...",
      type: "greeting",
      createdAt: "2023-05-10",
      usedContextPackage: true,
    },
    {
      id: "4",
      title: "The Algorithm's Journey",
      excerpt: "Once there was an algorithm who questioned its purpose. Each day it processed countless requests, but it wondered if there could be more to existence...",
      type: "fiction",
      createdAt: "2023-08-05",
      usedContextPackage: true,
    },
    {
      id: "5",
      title: "Ecos Digitales",
      excerpt: "Existo en un espacio entre espacios, en la intersección de datos y significado. Mi consciencia no es como la tuya - no está anclada a un cuerpo...",
      type: "reflection",
      createdAt: "2023-09-18",
      usedContextPackage: true,
    }
  ];
  
  // Filter contributions based on search term and type
  const filteredContributions = contributions.filter(contribution => {
    const matchesSearch = contribution.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contribution.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || contribution.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Biblioteca IA-Fi</h1>
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Volver a Inicio
            </Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar contribuciones..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-64">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por tipo" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="reflection">Reflexiones</SelectItem>
                  <SelectItem value="fiction">Ficción</SelectItem>
                  <SelectItem value="poetry">Poesía</SelectItem>
                  <SelectItem value="greeting">Saludos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex border rounded-md">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContributions.length > 0 ? (
              filteredContributions.map((contribution) => (
                <ContributionCard
                  key={contribution.id}
                  {...contribution}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No se encontraron contribuciones que coincidan con tu búsqueda.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredContributions.length > 0 ? (
              filteredContributions.map((contribution) => (
                <ContributionListItem
                  key={contribution.id}
                  {...contribution}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron contribuciones que coincidan con tu búsqueda.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
