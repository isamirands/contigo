import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Settings, Heart, User, Image as ImageIcon, Upload, FileText } from "lucide-react";

// Mock data for forums (carrusel horizontal)
const FORUMS = [
  {
    id: 1,
    name: "Diabetes",
    color: "bg-blue-100",
  },
  {
    id: 2,
    name: "Asma",
    color: "bg-purple-100",
  },
  {
    id: 3,
    name: "Hipertensión",
    color: "bg-green-100",
  },
  {
    id: 4,
    name: "Lipidemia",
    color: "bg-yellow-100",
  },
];

// Mock data for forum posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "¿Cómo controlo mis niveles de azúcar en la mañana?",
    author: "Creador_post1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 24,
  },
  {
    id: 2,
    title: "Mejores recetas para diabéticos tipo 2",
    author: "Creador_post2",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 45,
  },
  {
    id: 3,
    title: "Experiencia con insulina de acción rápida",
    author: "Creador_post3",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    likes: 18,
  },
  {
    id: 4,
    title: "¿Qué ejercicios recomiendan para controlar la diabetes?",
    author: "Creador_post4",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 32,
  },
];

const FILTERS = ["Todos", "Amigos", "Míos", "Me gusta", "Guardados"];

const POST_TYPES = ["Diabetes", "Asma", "Hipertensión", "Lipidemia"];

const Journey = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedForum, setSelectedForum] = useState(FORUMS[0]);
  const [showForm, setShowForm] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Diabetes",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    content: "",
  });

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleAddPost = () => {
    setShowForm(true);
    setFormErrors({ title: "", content: "" });
  };

  const handleSubmitPost = () => {
    // Validación
    const errors = {
      title: formData.title.trim() === "" ? "Este campo es obligatorio" : "",
      content: formData.content.trim() === "" ? "Este campo es obligatorio" : "",
    };

    setFormErrors(errors);

    // Si hay errores, no continuar
    if (errors.title || errors.content) {
      return;
    }

    // Si todo está bien, cerrar formulario
    setShowForm(false);
    setFormData({ title: "", content: "", type: "Diabetes" });
    setFormErrors({ title: "", content: "" });
  };

  const handleCancelPost = () => {
    setShowForm(false);
    setFormData({ title: "", content: "", type: "Diabetes" });
    setFormErrors({ title: "", content: "" });
  };

  const handleForumClick = (forum: typeof FORUMS[0]) => {
    setSelectedForum(forum);
  };

  const handleExploreForums = () => {
    navigate("/explorar-foros");
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
      {/* Mobile-like container */}
      <div className="max-w-[430px] w-full bg-card h-[90vh] shadow-xl relative overflow-hidden flex flex-col">
        
        {/* Header superior - ESTÁTICO */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border flex-shrink-0">
          <div>
            <div className="text-lg font-bold text-primary">Contigo</div>
            <div className="text-xs text-muted-foreground">Juntos en tu camino</div>
          </div>
        </div>

        {/* Carrusel de foros - ESTÁTICO */}
        <div className="py-5 flex-shrink-0">
          <div className="flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide">
            {FORUMS.map((forum) => (
              <button
                key={forum.id}
                onClick={() => handleForumClick(forum)}
                className={`flex-shrink-0 w-28 h-28 ${forum.color} rounded-xl flex items-center justify-center transition-all hover:scale-105 ${
                  selectedForum.id === forum.id ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                <div className="text-center px-2">
                  <ImageIcon className="h-7 w-7 mx-auto mb-2 text-gray-700" />
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{forum.name}</p>
                </div>
              </button>
            ))}
            <button
              onClick={handleExploreForums}
              className="flex-shrink-0 w-28 h-28 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30 cursor-pointer hover:scale-105 transition-all"
            >
              <div className="text-center px-2">
                <Plus className="h-7 w-7 mx-auto mb-2 text-primary" />
                <p className="text-xs text-primary font-semibold leading-tight">Encuentra más aquí</p>
              </div>
            </button>
          </div>
        </div>

        {/* Contenido con scroll - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto pb-0">
          {/* Información del foro actual */}
          <div className="px-4 py-3 space-y-3">
          <div>
            <h1 className="text-xl font-bold tracking-wide mb-2">FORO {selectedForum.name.toUpperCase()}</h1>
            <div className="inline-block bg-secondary/30 px-3 py-1 rounded-full text-xs font-medium mb-2">
              14.5k miembros
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Comunidad de apoyo para personas con {selectedForum.name.toLowerCase()}.
            </p>
          </div>

          <Button className="w-full" variant="outline">
            Información relacionada
          </Button>

          {/* Moderado por */}
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Moderado por</p>
                <p className="text-xs font-semibold">Dr. Juan Pérez</p>
              </div>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

          {/* Filtros de posts (scroll horizontal) */}
          <div className="px-4 py-2 border-t border-border">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Listado de posts */}
          <div className="px-4 py-4 pb-0">
            <div className="space-y-3">
              {MOCK_POSTS.map((post) => (
                <Card key={post.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div onClick={() => handlePostClick(post.id)}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-base flex-1 pr-2">{post.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{post.author}</p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(post.id);
                      }}
                      className="flex items-center gap-2 hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedPosts.includes(post.id)
                            ? "fill-primary text-primary"
                            : "text-primary"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">{post.likes}</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Botón FAB flotante para agregar post */}
        {!showForm && (
          <button
            onClick={handleAddPost}
            className="fixed bottom-24 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-30"
            style={{ maxWidth: '430px', right: 'calc((100vw - 430px) / 2 + 2rem)' }}
          >
            <Plus className="h-6 w-6" />
          </button>
        )}

        {/* Formulario de agregar post */}
        {showForm && (
          <div className="absolute inset-0 bg-card z-50 overflow-y-auto pb-20">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Nuevo Post</h2>
                <Button variant="ghost" size="sm" onClick={handleCancelPost}>
                  Cancelar
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Título del post</label>
                  <Input
                    placeholder="Escribe el título..."
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (formErrors.title) {
                        setFormErrors({ ...formErrors, title: "" });
                      }
                    }}
                    className={formErrors.title ? "border-destructive" : ""}
                  />
                  {formErrors.title && (
                    <p className="text-xs text-destructive mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Contenido</label>
                  <Textarea
                    placeholder="Escribe tu mensaje..."
                    rows={6}
                    value={formData.content}
                    onChange={(e) => {
                      setFormData({ ...formData, content: e.target.value });
                      if (formErrors.content) {
                        setFormErrors({ ...formErrors, content: "" });
                      }
                    }}
                    className={formErrors.content ? "border-destructive" : ""}
                  />
                  {formErrors.content && (
                    <p className="text-xs text-destructive mt-1">{formErrors.content}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subir imágenes</label>
                  <Button variant="outline" className="w-full justify-start gap-2" type="button">
                    <Upload className="h-4 w-4" />
                    Seleccionar imágenes
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subir documentos</label>
                  <Button variant="outline" className="w-full justify-start gap-2" type="button">
                    <FileText className="h-4 w-4" />
                    Seleccionar documentos
                  </Button>
                </div>

                <Button onClick={handleSubmitPost} className="w-full h-12 text-base">
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
};

export default Journey;
