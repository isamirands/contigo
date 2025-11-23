import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Diabetes", "Asma", "Hipertensión", "Lipidemia"];

// Mock data para foros
const FORUMS_PARA_TI = [
  { id: 1, title: "Diabetes Tipo 1", members: 666, image: "" },
  { id: 2, title: "Control de Glucosa", members: 892, image: "" },
  { id: 3, title: "Recetas Saludables", members: 1234, image: "" },
];

const FORUMS_AMIGOS = [
  { id: 4, title: "Ejercicio y Diabetes", members: 445, image: "" },
  { id: 5, title: "Apoyo Familiar", members: 778, image: "" },
  { id: 6, title: "Nutrición Balanceada", members: 923, image: "" },
];

const FORUMS_DESTACADOS = [
  { id: 7, title: "Vivir con Asma", members: 1567, image: "" },
  { id: 8, title: "Hipertensión Controlada", members: 2341, image: "" },
  { id: 9, title: "Colesterol y Lipidemia", members: 1890, image: "" },
];

const ExplorarForos = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Diabetes");

  const handleBackToJourney = () => {
    navigate("/journey");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile-like container */}
      <div className="max-w-[430px] mx-auto bg-card min-h-screen shadow-xl relative">
        
        {/* Header superior */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="text-lg font-bold text-primary">LOGO</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-4 py-1 text-xs"
          >
            Conoce más aquí
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Busca o encuentra el tema de tu interés"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 placeholder:text-xs"
            />
          </div>
        </div>

        {/* Chips de categorías */}
        <div className="px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido con scroll vertical */}
        <div className="overflow-y-auto pb-24">
          {/* Sección PARA TI */}
          <div className="py-4">
            <h2 className="text-lg font-bold mb-4 px-4">PARA TI</h2>
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {FORUMS_PARA_TI.map((forum) => (
                <Card key={forum.id} className="flex-shrink-0 w-40 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="bg-muted h-32 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{forum.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{forum.members}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sección DE TUS AMIGOS */}
          <div className="py-4">
            <h2 className="text-lg font-bold mb-4 px-4">DE TUS AMIGOS</h2>
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {FORUMS_AMIGOS.map((forum) => (
                <Card key={forum.id} className="flex-shrink-0 w-40 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="bg-muted h-32 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{forum.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{forum.members}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sección DESTACADOS */}
          <div className="py-4">
            <h2 className="text-lg font-bold mb-4 px-4">DESTACADOS</h2>
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {FORUMS_DESTACADOS.map((forum) => (
                <Card key={forum.id} className="flex-shrink-0 w-40 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="bg-muted h-32 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{forum.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{forum.members}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default ExplorarForos;
