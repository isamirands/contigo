import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Card } from "@/frontend/components/ui/card";
import tigoPenguin from "@/assets/tigo-walking-blue-penguin.png";
import EarthImage from "@/assets/Earth-2.png";

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

// Earth size constant - reduced by ~15% from 280px
const EARTH_SIZE = 238; // Fixed size in pixels
const PENGUIN_SIZE = 79; // Fixed penguin size

const GlobalJourney = () => {
  const navigate = useNavigate();
  
  // Calculate progress (0-100) - for now using mock value
  const progress = 35; // 35% of journey from South to North
  
  // Current location
  const currentLocation = TIMELINE_LOCATIONS.find(loc => loc.status === "current");
  
  // Earth and penguin positioning calculations
  const earthRadius = EARTH_SIZE / 2; // 119px
  // Penguin center radius: adjusted to be 13% closer (87% of doubled radius)
  const originalRadius = earthRadius - PENGUIN_SIZE / 2;
  const penguinCenterRadius = (originalRadius * 2) * 0.87;

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

        {/* Earth - with extra vertical spacing */}
        <section 
          className="relative z-10"
          style={{
            marginTop: "36px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Earth wrapper with fixed size and relative positioning */}
          <div 
            className="earth-wrapper relative"
            style={{ 
              width: `${EARTH_SIZE}px`, 
              height: `${EARTH_SIZE}px`,
              margin: "0 auto"
            }}
          >
            {/* Planet Earth - New Image */}
            <img
              src={EarthImage}
              alt="Planet Earth"
              className="drop-shadow-2xl"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 0 60px rgba(59, 130, 246, 0.4))",
              }}
            />

            {/* Tigos walking around Earth following the curvature */}
            {TEAM_MEMBERS.map((member, index) => {
              // Calculate position on left arc from bottom (South) to top (North)
              // Progress 0% = South Pole (bottom), 100% = North Pole (top)
              // Map to angle: 180° (bottom/South) to 270° (left/top/North)
              const baseAngle = 180 + (progress / 100) * 90; // 180° to 270°
              const angleRad = (baseAngle * Math.PI) / 180;
              
              // Add slight radial offset for multiple members (in pixels)
              const memberRadialOffset = index * 8; // pixels
              const currentRadius = penguinCenterRadius + memberRadialOffset;
              
              // Calculate position of penguin CENTER using polar coordinates
              const centerX = earthRadius; // Center of Earth container
              const centerY = earthRadius;
              const penguinCenterX = centerX + Math.cos(angleRad) * currentRadius;
              const penguinCenterY = centerY + Math.sin(angleRad) * currentRadius;
              
              // Position penguin so its center is at the calculated point
              const penguinLeft = penguinCenterX - PENGUIN_SIZE / 2;
              const penguinTop = penguinCenterY - PENGUIN_SIZE / 2;
              
              // Rotation: tangent to circle is angle + 90°
              const penguinRotation = baseAngle + 90;
              
              return (
                <img
                  key={member.id}
                  src={tigoPenguin}
                  alt={`Tigo de ${member.name}`}
                  className="absolute object-contain drop-shadow-lg"
                  style={{
                    width: `${PENGUIN_SIZE}px`,
                    height: `${PENGUIN_SIZE}px`,
                    left: `${penguinLeft}px`,
                    top: `${penguinTop}px`,
                    transform: `rotate(${penguinRotation}deg)`,
                    transformOrigin: "center center",
                  }}
                />
              );
            })}
          </div>
        </section>
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
