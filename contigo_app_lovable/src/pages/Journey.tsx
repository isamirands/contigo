import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { MapPin, CheckCircle2, Circle } from "lucide-react";
import tigoPenguin from "@/assets/tigo-penguin.png";

const JOURNEY_MILESTONES = [
  { id: 1, name: "Base del Glaciar", completed: true, steps: 4 },
  { id: 2, name: "Valle Nevado", completed: true, steps: 8 },
  { id: 3, name: "Bosque de Pinos", completed: false, steps: 12, current: true },
  { id: 4, name: "Lago Cristalino", completed: false, steps: 16 },
  { id: 5, name: "Cumbre de la Montaña", completed: false, steps: 20 },
];

const Journey = () => {
  const currentSteps = 10;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Tu Viaje</h1>
          <p className="text-sm text-muted-foreground mt-1">El camino de Tigo</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress Overview */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={tigoPenguin} 
              alt="Tigo" 
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Pasos totales</h2>
              <p className="text-3xl font-bold text-primary">{currentSteps}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cada actividad = 1 paso adelante
              </p>
            </div>
          </div>
        </Card>

        {/* Journey Map */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Mapa del viaje</h2>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-border" />
            
            {JOURNEY_MILESTONES.map((milestone, index) => (
              <div key={milestone.id} className="relative pb-8 last:pb-0">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background ${
                    milestone.completed 
                      ? 'bg-success' 
                      : milestone.current 
                        ? 'bg-primary' 
                        : 'bg-muted'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    ) : milestone.current ? (
                      <MapPin className="h-8 w-8 text-white" />
                    ) : (
                      <Circle className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <Card className={`flex-1 p-5 ${
                    milestone.current ? 'border-primary bg-primary/5' : ''
                  }`}>
                    <h3 className="text-lg font-semibold mb-2">
                      {milestone.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {milestone.steps} pasos necesarios
                      </span>
                      {milestone.completed && (
                        <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                          ¡Completado!
                        </span>
                      )}
                      {milestone.current && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Ubicación actual
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational message */}
        <Card className="p-6 mt-8 bg-accent/20 border-accent">
          <p className="text-center text-sm leading-relaxed">
            <span className="font-semibold">Recuerda:</span> Cada pequeño paso cuenta. 
            Tu constancia inspira a tu equipo y Tigo celebra cada logro contigo. 
            ¡Sigue adelante! 🐧✨
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Journey;
