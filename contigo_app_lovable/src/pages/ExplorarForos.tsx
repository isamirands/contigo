import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Image as ImageIcon, ArrowLeft, Plus, Upload } from "lucide-react";

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
  const [showCreateForumModal, setShowCreateForumModal] = useState(false);
  const [forumData, setForumData] = useState({
    title: "",
    category: "Diabetes",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleBackToJourney = () => {
    navigate("/journey");
  };

  const handleCreateForum = () => {
    setShowCreateForumModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForum = () => {
    // Cerrar modal (comportamiento simulado)
    setShowCreateForumModal(false);
    setForumData({ title: "", category: "Diabetes" });
    setImagePreview(null);
  };

  const handleCancelForum = () => {
    setShowCreateForumModal(false);
    setForumData({ title: "", category: "Diabetes" });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile-like container */}
      <div className="max-w-[430px] mx-auto bg-card min-h-screen shadow-xl relative">
        
        {/* Header superior */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={handleBackToJourney} className="hover:bg-muted rounded-full p-1 transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <div className="text-lg font-bold text-primary">Contigo</div>
            <div className="text-xs text-muted-foreground">Juntos en tu camino</div>
          </div>
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

        {/* Botón flotante para crear foro */}
        <button
          onClick={handleCreateForum}
          className="fixed bottom-24 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          style={{ maxWidth: '430px', right: 'calc((100vw - 430px) / 2 + 2rem)' }}
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Modal para crear foro */}
        {showCreateForumModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold">Crear Foro</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Título del foro</label>
                  <Input
                    placeholder="Escribe el título del foro..."
                    value={forumData.title}
                    onChange={(e) => setForumData({ ...forumData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Categoría del foro</label>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    value={forumData.category}
                    onChange={(e) => setForumData({ ...forumData, category: e.target.value })}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subir imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="forum-image-upload"
                  />
                  <label htmlFor="forum-image-upload">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      type="button"
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4" />
                        Seleccionar imagen
                      </span>
                    </Button>
                  </label>

                  {/* Vista previa de la imagen */}
                  {imagePreview && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-border">
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Botones en la misma fila */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleCancelForum}
                    variant="outline"
                    className="flex-1 h-11 text-base"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSubmitForum}
                    className="flex-1 h-11 text-base"
                  >
                    Crear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorarForos;
