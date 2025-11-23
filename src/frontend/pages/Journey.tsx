import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/frontend/components/BottomNav";
import { UnifiedHeader } from "@/frontend/components/UnifiedHeader";
import { Card } from "@/frontend/components/ui/card";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Textarea } from "@/frontend/components/ui/textarea";
import { Plus, Heart, User, Image as ImageIcon, Upload, FileText } from "lucide-react";

// Mock data for forums (carrusel horizontal)
const FORUMS = [
  {
    id: 1,
    name: "Diabetes",
    color: "bg-blue-100",
    description: "Espacio de apoyo y aprendizaje para personas con diabetes. Comparte experiencias, recetas saludables y consejos para el control de glucosa.",
    posts: [
      {
        id: 1,
        title: "¿Cómo controlo mis niveles de azúcar en la mañana?",
        author: "María López",
        content: "He notado que mis niveles de glucosa están altos al despertar. ¿Alguien tiene consejos sobre qué cenar para evitar esto? Mi doctor mencionó el efecto del amanecer pero me gustaría saber sus experiencias.",
        likes: 24,
      },
      {
        id: 2,
        title: "Recetas de desayunos bajos en carbohidratos",
        author: "Carlos Ramírez",
        content: "Comparto mis desayunos favoritos que me han ayudado a mantener estable mi glucosa: huevos revueltos con espinacas, yogurt griego con nueces, y avena con canela. ¿Qué desayunan ustedes?",
        likes: 45,
      },
      {
        id: 3,
        title: "Mi experiencia con la insulina de acción rápida",
        author: "Ana Torres",
        content: "Después de 6 meses usando insulina rápida antes de las comidas, he logrado un mejor control. Al principio tenía miedo pero con la guía de mi endocrinólogo todo ha mejorado. ¿Alguien más usa insulina?",
        likes: 18,
      },
      {
        id: 4,
        title: "Ejercicios recomendados para diabéticos",
        author: "Jorge Mendoza",
        content: "Empecé a caminar 30 minutos diarios y he visto una gran diferencia en mis niveles de glucosa. ¿Qué tipo de ejercicio les ha funcionado mejor? Me gustaría probar algo nuevo.",
        likes: 32,
      },
    ],
  },
  {
    id: 2,
    name: "Asma",
    color: "bg-purple-100",
    description: "Comunidad para personas con asma. Intercambia información sobre tratamientos, manejo de crisis y cómo vivir mejor con esta condición.",
    posts: [
      {
        id: 5,
        title: "¿Cómo identificar los desencadenantes del asma?",
        author: "Patricia Silva",
        content: "He estado llevando un diario de síntomas y creo que el polvo y el frío son mis principales desencadenantes. ¿Cómo identificaron ustedes los suyos?",
        likes: 19,
      },
      {
        id: 6,
        title: "Técnicas de respiración que me han ayudado",
        author: "Roberto Díaz",
        content: "Mi neumólogo me enseñó ejercicios de respiración diafragmática que han reducido mis crisis. Los practico 10 minutos cada mañana. ¿Alguien más usa técnicas de respiración?",
        likes: 28,
      },
      {
        id: 7,
        title: "Uso correcto del inhalador de rescate",
        author: "Laura Martínez",
        content: "Descubrí que no estaba usando bien mi inhalador. La enfermera me mostró la técnica correcta y ahora siento que funciona mucho mejor. ¿Alguien tiene dudas sobre su inhalador?",
        likes: 15,
      },
      {
        id: 8,
        title: "Asma y ejercicio: mi experiencia",
        author: "Miguel Ángel",
        content: "Tenía miedo de hacer ejercicio por el asma, pero con mi inhalador preventivo antes de entrenar, he podido correr sin problemas. El ejercicio ha mejorado mi capacidad pulmonar.",
        likes: 22,
      },
    ],
  },
  {
    id: 3,
    name: "Hipertensión",
    color: "bg-green-100",
    description: "Foro dedicado al control de la presión arterial. Comparte estrategias de alimentación, ejercicio y manejo del estrés para una vida más saludable.",
    posts: [
      {
        id: 9,
        title: "Reducir la sal sin perder sabor en las comidas",
        author: "Carmen Vega",
        content: "He aprendido a usar especias como ajo, cebolla, orégano y limón para dar sabor sin sal. Mis niveles de presión han mejorado notablemente. ¿Qué especias usan ustedes?",
        likes: 31,
      },
      {
        id: 10,
        title: "¿Cómo manejan el estrés para controlar la presión?",
        author: "Fernando Ruiz",
        content: "Noté que mi presión sube cuando estoy estresado. Empecé a meditar 15 minutos al día y ha hecho una gran diferencia. ¿Qué técnicas de relajación les funcionan?",
        likes: 26,
      },
      {
        id: 11,
        title: "Mi rutina de ejercicio para la hipertensión",
        author: "Sandra Morales",
        content: "Camino 40 minutos 5 veces por semana y hago yoga 2 veces. Mi cardiólogo está muy contento con mis resultados. El ejercicio regular es clave para controlar la presión.",
        likes: 20,
      },
      {
        id: 12,
        title: "Importancia de medir la presión en casa",
        author: "Luis Herrera",
        content: "Compré un tensiómetro digital y ahora llevo un registro diario. Esto me ha ayudado a identificar patrones y ajustar mi medicación con mi doctor. ¿Ustedes miden su presión en casa?",
        likes: 17,
      },
    ],
  },
  {
    id: 4,
    name: "Dislipidemia",
    color: "bg-yellow-100",
    description: "Comunidad enfocada en el control del colesterol y triglicéridos. Aprende sobre alimentación saludable y hábitos que mejoran tu perfil lipídico.",
    posts: [
      {
        id: 13,
        title: "Alimentos que ayudan a bajar el colesterol",
        author: "Elena Castro",
        content: "Incorporé avena, nueces, pescado azul y aceite de oliva a mi dieta. En 3 meses mi colesterol bajó 30 puntos. La alimentación realmente hace la diferencia.",
        likes: 38,
      },
      {
        id: 14,
        title: "¿Estatinas sí o no? Mi experiencia",
        author: "Ricardo Flores",
        content: "Después de intentar solo con dieta, mi doctor me recetó estatinas. Al principio tenía dudas pero mis niveles mejoraron mucho. ¿Alguien más toma estatinas?",
        likes: 21,
      },
      {
        id: 15,
        title: "Ejercicio aeróbico y colesterol HDL",
        author: "Mónica Reyes",
        content: "Empecé a nadar 3 veces por semana y mi colesterol bueno (HDL) subió significativamente. El ejercicio aeróbico es excelente para mejorar el perfil lipídico.",
        likes: 25,
      },
      {
        id: 16,
        title: "Entendiendo los resultados del perfil lipídico",
        author: "Alberto Sánchez",
        content: "Mi doctor me explicó la diferencia entre LDL, HDL y triglicéridos. Ahora entiendo mejor mis análisis y qué debo mejorar. ¿Alguien tiene dudas sobre sus resultados?",
        likes: 14,
      },
    ],
  },
];

const FILTERS = ["Todos", "Amigos", "Míos", "Me gusta", "Guardados"];

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

  const currentPosts = selectedForum.posts || [];

  const handleExploreForums = () => {
    navigate("/explorar-foros");
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
      {/* Mobile-like container */}
      <div className="max-w-[430px] w-full bg-card h-[90vh] shadow-xl relative overflow-hidden flex flex-col">
        
        {/* Unified Header */}
        <UnifiedHeader title="Comunidad" />

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
              {selectedForum.description}
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
              {currentPosts.map((post) => (
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
