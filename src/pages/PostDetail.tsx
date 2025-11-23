import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Bookmark, Plus, User } from "lucide-react";

// Mock data para todos los posts (igual que en Journey)
const ALL_POSTS = [
  // Diabetes
  {
    id: 1,
    title: "¿Cómo controlo mis niveles de azúcar en la mañana?",
    author: "María López",
    content: "He notado que mis niveles de glucosa están altos al despertar. ¿Alguien tiene consejos sobre qué cenar para evitar esto? Mi doctor mencionó el efecto del amanecer pero me gustaría saber sus experiencias.",
    likes: 24,
    category: "Diabetes",
  },
  {
    id: 2,
    title: "Recetas de desayunos bajos en carbohidratos",
    author: "Carlos Ramírez",
    content: "Comparto mis desayunos favoritos que me han ayudado a mantener estable mi glucosa: huevos revueltos con espinacas, yogurt griego con nueces, y avena con canela. ¿Qué desayunan ustedes?",
    likes: 45,
    category: "Diabetes",
  },
  {
    id: 3,
    title: "Mi experiencia con la insulina de acción rápida",
    author: "Ana Torres",
    content: "Después de 6 meses usando insulina rápida antes de las comidas, he logrado un mejor control. Al principio tenía miedo pero con la guía de mi endocrinólogo todo ha mejorado. ¿Alguien más usa insulina?",
    likes: 18,
    category: "Diabetes",
  },
  {
    id: 4,
    title: "Ejercicios recomendados para diabéticos",
    author: "Jorge Mendoza",
    content: "Empecé a caminar 30 minutos diarios y he visto una gran diferencia en mis niveles de glucosa. ¿Qué tipo de ejercicio les ha funcionado mejor? Me gustaría probar algo nuevo.",
    likes: 32,
    category: "Diabetes",
  },
  // Asma
  {
    id: 5,
    title: "¿Cómo identificar los desencadenantes del asma?",
    author: "Patricia Silva",
    content: "He estado llevando un diario de síntomas y creo que el polvo y el frío son mis principales desencadenantes. ¿Cómo identificaron ustedes los suyos?",
    likes: 19,
    category: "Asma",
  },
  {
    id: 6,
    title: "Técnicas de respiración que me han ayudado",
    author: "Roberto Díaz",
    content: "Mi neumólogo me enseñó ejercicios de respiración diafragmática que han reducido mis crisis. Los practico 10 minutos cada mañana. ¿Alguien más usa técnicas de respiración?",
    likes: 28,
    category: "Asma",
  },
  {
    id: 7,
    title: "Uso correcto del inhalador de rescate",
    author: "Laura Martínez",
    content: "Descubrí que no estaba usando bien mi inhalador. La enfermera me mostró la técnica correcta y ahora siento que funciona mucho mejor. ¿Alguien tiene dudas sobre su inhalador?",
    likes: 15,
    category: "Asma",
  },
  {
    id: 8,
    title: "Asma y ejercicio: mi experiencia",
    author: "Miguel Ángel",
    content: "Tenía miedo de hacer ejercicio por el asma, pero con mi inhalador preventivo antes de entrenar, he podido correr sin problemas. El ejercicio ha mejorado mi capacidad pulmonar.",
    likes: 22,
    category: "Asma",
  },
  // Hipertensión
  {
    id: 9,
    title: "Reducir la sal sin perder sabor en las comidas",
    author: "Carmen Vega",
    content: "He aprendido a usar especias como ajo, cebolla, orégano y limón para dar sabor sin sal. Mis niveles de presión han mejorado notablemente. ¿Qué especias usan ustedes?",
    likes: 31,
    category: "Hipertensión",
  },
  {
    id: 10,
    title: "¿Cómo manejan el estrés para controlar la presión?",
    author: "Fernando Ruiz",
    content: "Noté que mi presión sube cuando estoy estresado. Empecé a meditar 15 minutos al día y ha hecho una gran diferencia. ¿Qué técnicas de relajación les funcionan?",
    likes: 26,
    category: "Hipertensión",
  },
  {
    id: 11,
    title: "Mi rutina de ejercicio para la hipertensión",
    author: "Sandra Morales",
    content: "Camino 40 minutos 5 veces por semana y hago yoga 2 veces. Mi cardiólogo está muy contento con mis resultados. El ejercicio regular es clave para controlar la presión.",
    likes: 20,
    category: "Hipertensión",
  },
  {
    id: 12,
    title: "Importancia de medir la presión en casa",
    author: "Luis Herrera",
    content: "Compré un tensiómetro digital y ahora llevo un registro diario. Esto me ha ayudado a identificar patrones y ajustar mi medicación con mi doctor. ¿Ustedes miden su presión en casa?",
    likes: 17,
    category: "Hipertensión",
  },
  // Dislipidemia
  {
    id: 13,
    title: "Alimentos que ayudan a bajar el colesterol",
    author: "Elena Castro",
    content: "Incorporé avena, nueces, pescado azul y aceite de oliva a mi dieta. En 3 meses mi colesterol bajó 30 puntos. La alimentación realmente hace la diferencia.",
    likes: 38,
    category: "Dislipidemia",
  },
  {
    id: 14,
    title: "¿Estatinas sí o no? Mi experiencia",
    author: "Ricardo Flores",
    content: "Después de intentar solo con dieta, mi doctor me recetó estatinas. Al principio tenía dudas pero mis niveles mejoraron mucho. ¿Alguien más toma estatinas?",
    likes: 21,
    category: "Dislipidemia",
  },
  {
    id: 15,
    title: "Ejercicio aeróbico y colesterol HDL",
    author: "Mónica Reyes",
    content: "Empecé a nadar 3 veces por semana y mi colesterol bueno (HDL) subió significativamente. El ejercicio aeróbico es excelente para mejorar el perfil lipídico.",
    likes: 25,
    category: "Dislipidemia",
  },
  {
    id: 16,
    title: "Entendiendo los resultados del perfil lipídico",
    author: "Alberto Sánchez",
    content: "Mi doctor me explicó la diferencia entre LDL, HDL y triglicéridos. Ahora entiendo mejor mis análisis y qué debo mejorar. ¿Alguien tiene dudas sobre sus resultados?",
    likes: 14,
    category: "Dislipidemia",
  },
];

// Función para generar comentarios según la categoría del post
const generateComments = (postCategory: string) => {
  const commentsByCategory: Record<string, Array<{ author: string; content: string; daysAgo: number }>> = {
    Diabetes: [
      { author: "Pedro_Gonzalez", content: "A mí también me pasa lo mismo. He intentado cenar más temprano y evitar carbohidratos en la noche.", daysAgo: 3 },
      { author: "Sofia_M", content: "Mi endocrinóloga me recomendó hacer ejercicio ligero después de cenar, como caminar 15 minutos.", daysAgo: 5 },
      { author: "Luis_Diabetes", content: "Excelente post. Yo llevo un diario de glucosa y he notado que las proteínas en la cena me ayudan.", daysAgo: 8 },
      { author: "Carmen_R", content: "Gracias por compartir. ¿Alguien ha probado con canela antes de dormir?", daysAgo: 12 },
    ],
    Asma: [
      { author: "Julia_Asma", content: "Muy útil esta información. Yo también identifico mis desencadenantes con un diario.", daysAgo: 4 },
      { author: "Roberto_M", content: "El ejercicio de respiración me ha cambiado la vida. Lo recomiendo totalmente.", daysAgo: 7 },
      { author: "Andrea_Lopez", content: "Mi neumólogo me enseñó algo similar. La técnica correcta del inhalador es clave.", daysAgo: 10 },
      { author: "Diego_Salud", content: "Gracias por compartir tu experiencia. Me motiva a seguir cuidándome.", daysAgo: 15 },
    ],
    Hipertensión: [
      { author: "Marta_HTA", content: "Las especias son una excelente alternativa a la sal. Yo uso mucho el ajo y el jengibre.", daysAgo: 2 },
      { author: "Fernando_Fit", content: "La meditación y el ejercicio han sido fundamentales para controlar mi presión.", daysAgo: 6 },
      { author: "Isabel_Cardio", content: "Yo también mido mi presión en casa. Es importante llevar un registro para el doctor.", daysAgo: 9 },
      { author: "Carlos_Wellness", content: "El yoga me ha ayudado mucho con el estrés y la presión arterial.", daysAgo: 14 },
    ],
    Dislipidemia: [
      { author: "Elena_Nutricion", content: "La avena y las nueces son mis aliados. Mi colesterol ha mejorado notablemente.", daysAgo: 3 },
      { author: "Ricardo_Salud", content: "Yo tomo estatinas y me han funcionado muy bien. No hay que tener miedo si el doctor las receta.", daysAgo: 7 },
      { author: "Monica_Fit", content: "El ejercicio aeróbico es clave. Yo nado y mis análisis han mejorado mucho.", daysAgo: 11 },
      { author: "Alberto_Med", content: "Entender los resultados del perfil lipídico es importante. Gracias por compartir.", daysAgo: 16 },
    ],
  };

  return commentsByCategory[postCategory] || [
    { author: "Usuario_General", content: "Muy interesante tu experiencia. Gracias por compartir.", daysAgo: 5 },
    { author: "Comunidad_Salud", content: "Este tipo de posts son muy valiosos para todos nosotros.", daysAgo: 8 },
    { author: "Apoyo_Mutuo", content: "Gracias por abrir este espacio de conversación.", daysAgo: 12 },
  ];
};

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");

  // Buscar el post por ID
  const post = ALL_POSTS.find((p) => p.id === Number(id));

  // Si no se encuentra el post, mostrar mensaje
  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Post no encontrado</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // Generar comentarios según la categoría del post
  const comments = generateComments(post.category);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddComment = () => {
    setShowCommentModal(true);
    setCommentError("");
  };

  const handleSendComment = () => {
    // Validación
    if (commentText.trim() === "") {
      setCommentError("Este campo es obligatorio");
      return;
    }

    // Cerrar modal y limpiar texto
    setShowCommentModal(false);
    setCommentText("");
    setCommentError("");
  };

  const handleCancelComment = () => {
    setShowCommentModal(false);
    setCommentText("");
    setCommentError("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
      {/* Mobile-like container */}
      <div className="max-w-[430px] w-full bg-card h-[90vh] shadow-xl relative overflow-hidden flex flex-col">
        
        {/* Header con flecha de regreso */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={handleBack} className="hover:bg-muted rounded-full p-1 transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground flex-1 text-center pr-6">
            {post.title}
          </h1>
        </div>

        {/* Contenido principal con scroll */}
        <div className="flex-1 overflow-y-auto">
          {/* Información del post */}
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold">{post.author}</span>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {post.content}
            </p>

            {/* Likes y guardados */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 hover:scale-110 transition-transform"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked ? "fill-primary text-primary" : "text-primary"
                  }`}
                />
                <span className="text-sm text-muted-foreground">{post.likes}</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 hover:scale-110 transition-transform"
              >
                <Bookmark
                  className={`h-5 w-5 ${
                    isSaved ? "fill-primary text-primary" : "text-primary"
                  }`}
                />
                <span className="text-sm text-muted-foreground">156</span>
              </button>
            </div>
          </div>

          {/* Lista de comentarios */}
          <div className="px-4 py-4">
            <h2 className="text-sm font-bold mb-4 text-muted-foreground">COMENTARIOS</h2>
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <span className="text-sm font-semibold">{comment.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">hace {comment.daysAgo} días</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {comment.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Botón fijo AGREGAR COMENTARIO */}
        <div className="border-t border-border bg-card">
          <div className="px-4 py-3">
            <Button
              onClick={handleAddComment}
              className="w-full h-12 text-base gap-2 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              AGREGAR COMENTARIO
            </Button>
          </div>
        </div>

        <BottomNav />

        {/* Modal para agregar comentario */}
        {showCommentModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
              {/* Avatar del usuario */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Textarea para el comentario */}
              <div>
                <label className="text-sm font-medium mb-2 block">Tu comentario</label>
                <Textarea
                  placeholder="Escribe tu comentario aquí..."
                  rows={4}
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    if (commentError) {
                      setCommentError("");
                    }
                  }}
                  className={`resize-none ${commentError ? "border-destructive" : ""}`}
                />
                {commentError && (
                  <p className="text-xs text-destructive mt-1">{commentError}</p>
                )}
              </div>

              {/* Botones en la misma fila */}
              <div className="flex gap-2">
                <Button
                  onClick={handleCancelComment}
                  variant="outline"
                  className="flex-1 h-11 text-base"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSendComment}
                  className="flex-1 h-11 text-base"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
