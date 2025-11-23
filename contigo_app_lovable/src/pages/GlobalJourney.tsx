import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import tigoPenguin from "@/assets/tigo-walking-blue-penguin.png";

interface TimelineLocation {
  id: string;
  country: string;
  flag: string;
  status: "visited" | "current" | "locked";
  subtitle: string;
}

const TIMELINE_LOCATIONS: TimelineLocation[] = [
  {
    id: "chile",
    country: "Chile",
    flag: "🇨🇱",
    status: "visited",
    subtitle: "Ya caminamos por aquí",
  },
  {
    id: "peru",
    country: "Perú",
    flag: "🇵🇪",
    status: "current",
    subtitle: "Estamos caminando por aquí ahora",
  },
  {
    id: "future1",
    country: "???",
    flag: "❓",
    status: "locked",
    subtitle: "Aún bloqueado",
  },
  {
    id: "future2",
    country: "???",
    flag: "❓",
    status: "locked",
    subtitle: "Aún bloqueado",
  },
];

// Mock team members for Tigos on Earth
const TEAM_MEMBERS = [
  { id: "user1", name: "Tú" },
  { id: "user2", name: "Ana" },
];

const GlobalJourney = () => {
  const navigate = useNavigate();
  
  // Calculate progress (0-100) - for now using mock value
  const progress = 35; // 35% of journey from South to North
  
  // Current location
  const currentLocation = TIMELINE_LOCATIONS.find(loc => loc.status === "current");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5 text-slate-200" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-100">Viaje Global</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Earth Section with Space Background */}
      <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>

        {/* Current location label */}
        <div className="relative z-10 pt-6 pb-4 text-center">
          <p className="text-slate-300 text-sm mb-1">Caminando por</p>
          <p className="text-2xl font-semibold text-slate-100">
            {currentLocation?.flag} {currentLocation?.country}
          </p>
        </div>

        {/* Earth */}
        <div className="relative z-10 flex justify-center items-center py-8">
          <div className="relative">
            {/* Planet Earth */}
            <div
              className="rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 shadow-2xl relative overflow-hidden"
              style={{
                width: "280px",
                height: "280px",
                boxShadow: "0 0 60px rgba(59, 130, 246, 0.5), inset -20px -20px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Continents overlay (simplified) */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-green-600 rounded-full transform -rotate-12" />
                <div className="absolute top-1/3 right-1/4 w-20 h-16 bg-green-600 rounded-full transform rotate-45" />
                <div className="absolute bottom-1/3 left-1/3 w-14 h-10 bg-green-600 rounded-full" />
              </div>
              
              {/* Clouds */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 right-1/3 w-12 h-6 bg-white rounded-full blur-sm" />
                <div className="absolute bottom-1/3 left-1/4 w-10 h-5 bg-white rounded-full blur-sm" />
              </div>
            </div>

            {/* Tigos walking on the left side of Earth (South to North path) */}
            <div className="absolute inset-0">
              {TEAM_MEMBERS.map((member, index) => {
                // Calculate position on left arc from bottom (South) to top (North)
                // Progress 0% = bottom-left, 100% = top-left
                const angle = 180 + (progress / 100) * 90; // 180° (bottom) to 270° (left-top)
                const radius = 140 + 40; // Earth radius + offset
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                // Slight offset for multiple members
                const memberOffset = index * 8;
                
                return (
                  <div
                    key={member.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) translateY(${memberOffset}px)`,
                    }}
                  >
                    <img
                      src={tigoPenguin}
                      alt={`Tigo de ${member.name}`}
                      className="object-contain drop-shadow-lg"
                      style={{
                        width: "79px",
                        height: "79px",
                        minWidth: "79px",
                        minHeight: "79px",
                        maxWidth: "79px",
                        maxHeight: "79px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recorrido del equipo</h2>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {TIMELINE_LOCATIONS.map((location, index) => {
              const isVisited = location.status === "visited";
              const isCurrent = location.status === "current";
              const isLocked = location.status === "locked";
              
              return (
                <div key={location.id} className="relative flex items-start gap-4">
                  {/* Timeline node */}
                  <div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCurrent
                        ? "bg-primary ring-4 ring-primary/20"
                        : isVisited
                        ? "bg-muted border-2 border-border"
                        : "bg-muted/50 border-2 border-dashed border-border"
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <span className="text-2xl">{location.flag}</span>
                    )}
                  </div>

                  {/* Location card */}
                  <Card
                    className={`flex-1 p-4 ${
                      isCurrent
                        ? "border-primary bg-primary/5"
                        : isVisited
                        ? "bg-card"
                        : "bg-muted/30 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-lg mb-1 ${
                            isLocked ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {location.country}
                        </h3>
                        <p
                          className={`text-sm ${
                            isCurrent
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {location.subtitle}
                        </p>
                      </div>
                      
                      {isCurrent && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          En progreso
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-24" />
    </div>
  );
};

export default GlobalJourney;
