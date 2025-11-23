import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, MessageCircle, PenSquare, Search } from "lucide-react";
import { toast } from "sonner";

// Mock data for communities
const COMMUNITIES = [
  {
    id: 1,
    name: "Diabetes tipo 2 Lima",
    tagline: "Compartiendo recetas y consejos",
    members: 234,
    color: "bg-blue-100",
  },
  {
    id: 2,
    name: "Cuidadores de papás",
    tagline: "Apoyo entre familiares",
    members: 156,
    color: "bg-purple-100",
  },
  {
    id: 3,
    name: "Hipertensión y caminatas",
    tagline: "Ejercicio suave en grupo",
    members: 189,
    color: "bg-green-100",
  },
];

// Mock data for posts
const MOCK_POSTS = {
  1: [
    {
      id: 1,
      title: "¿Qué desayunos les funcionan mejor?",
      author: "María L.",
      timeAgo: "2h",
      likes: 12,
      comments: 8,
    },
    {
      id: 2,
      title: "Compartiendo mi experiencia con el nuevo medidor",
      author: "Carlos R.",
      timeAgo: "5h",
      likes: 24,
      comments: 15,
    },
    {
      id: 3,
      title: "Tips para controlar la glucosa en fiestas",
      author: "Ana M.",
      timeAgo: "1d",
      likes: 45,
      comments: 23,
    },
  ],
  2: [
    {
      id: 4,
      title: "¿Cómo manejan el cansancio emocional?",
      author: "Pedro S.",
      timeAgo: "1h",
      likes: 18,
      comments: 12,
    },
    {
      id: 5,
      title: "Recursos para cuidadores en Lima",
      author: "Lucía P.",
      timeAgo: "4h",
      likes: 31,
      comments: 19,
    },
    {
      id: 6,
      title: "Mi papá no quiere tomar sus medicinas",
      author: "Jorge M.",
      timeAgo: "6h",
      likes: 22,
      comments: 28,
    },
  ],
  3: [
    {
      id: 7,
      title: "Ruta recomendada: Parque Kennedy",
      author: "Rosa T.",
      timeAgo: "3h",
      likes: 15,
      comments: 7,
    },
    {
      id: 8,
      title: "¿Alguien para caminar mañana 7am?",
      author: "Miguel A.",
      timeAgo: "5h",
      likes: 9,
      comments: 11,
    },
    {
      id: 9,
      title: "Logré caminar 30 minutos sin parar!",
      author: "Carmen V.",
      timeAgo: "1d",
      likes: 52,
      comments: 18,
    },
  ],
};

const Journey = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(COMMUNITIES[0]);

  const currentPosts = MOCK_POSTS[selectedCommunity.id as keyof typeof MOCK_POSTS] || [];

  const handleCreatePost = () => {
    toast.info(`Crear publicación en "${selectedCommunity.name}"`, {
      description: "Función próximamente disponible",
    });
  };

  const handleExploreCommunities = () => {
    toast.info("Explorar comunidades", {
      description: "Función próximamente disponible",
    });
  };

  const handlePostClick = (postTitle: string) => {
    toast.info(`Abrir: ${postTitle}`);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Comunidad</h1>
          <p className="text-sm text-muted-foreground mt-1">Conecta con otros</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Section 1: Communities Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Tus comunidades</h2>
          <div className="grid grid-cols-2 gap-3">
            {COMMUNITIES.map((community) => (
              <button
                key={community.id}
                onClick={() => setSelectedCommunity(community)}
                className={`${community.color} rounded-2xl p-4 text-left transition-all hover:scale-105 active:scale-95 ${
                  selectedCommunity.id === community.id
                    ? "ring-2 ring-primary shadow-lg"
                    : "shadow-sm"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <Users className="h-5 w-5 text-gray-700 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-sm leading-tight text-gray-800">
                    {community.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-2">{community.tagline}</p>
                <p className="text-xs text-gray-500">{community.members} miembros</p>
              </button>
            ))}

            {/* Explore/Create Community Card */}
            <button
              onClick={handleExploreCommunities}
              className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-4 text-left transition-all hover:scale-105 active:scale-95 shadow-sm border-2 border-dashed border-primary/30"
            >
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <Search className="h-6 w-6 text-primary" />
                <p className="text-sm font-semibold text-center text-primary">
                  Explorar comunidades
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Community Feed */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">{selectedCommunity.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedCommunity.tagline}</p>
          </div>

          {/* Posts List */}
          <div className="space-y-3">
            {currentPosts.map((post) => (
              <Card
                key={post.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostClick(post.title)}
              >
                <h3 className="font-semibold text-base mb-2 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Section 3: Create Post Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border z-30">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Button
            size="lg"
            className="w-full h-14 text-lg gap-2"
            onClick={handleCreatePost}
          >
            <PenSquare className="h-5 w-5" />
            Crear publicación
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Journey;
