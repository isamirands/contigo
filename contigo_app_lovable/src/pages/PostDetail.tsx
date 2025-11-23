import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Bookmark, Plus, User } from "lucide-react";

// Mock data para comentarios
const MOCK_COMMENTS = [
  {
    id: 1,
    author: "Creador_post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    daysAgo: 24,
  },
  {
    id: 2,
    author: "Usuario_123",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    daysAgo: 18,
  },
  {
    id: 3,
    author: "Maria_Lopez",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    daysAgo: 12,
  },
  {
    id: 4,
    author: "Carlos_R",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    daysAgo: 8,
  },
  {
    id: 5,
    author: "Ana_Martinez",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    daysAgo: 5,
  },
];

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");

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
            TITULO DEL POST DEL FORO
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
              <span className="text-sm font-semibold">Creador_post</span>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                <span className="text-sm text-muted-foreground">2600</span>
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
              {MOCK_COMMENTS.map((comment) => (
                <Card key={comment.id} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <span className="text-sm font-semibold">{comment.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.daysAgo} días</span>
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
