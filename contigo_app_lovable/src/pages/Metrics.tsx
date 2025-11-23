import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { 
  Settings, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  BarChart3,
  MapPin,
  Heart,
  Activity,
  Droplet,
  BookOpen,
  Trophy,
  Plane,
  Medal,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Metrics = () => {
  const navigate = useNavigate();

  // Mock data
  const todayProgress = 40;
  const currentStreak = 7;
  const perfectDays = 12;
  const habitsCompleted = 156;
  const dailyAverage = 4.2;
  const journeySteps = 245;
  const nextDestinationSteps = 500;

  // Calendar data
  const daysInMonth = 30;
  const today = 22;
  const greenDays = 12;
  const yellowDays = 8;
  const redDays = 3;
  
  const dayCompletions = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    if (day > today) return null;
    if (day === today) return todayProgress;
    return Math.floor(Math.random() * 100);
  });

  const getDayColor = (completion: number | null) => {
    if (completion === null) return "bg-muted text-muted-foreground";
    if (completion === 100) return "bg-success text-white";
    if (completion >= 50) return "bg-accent text-foreground";
    return "bg-destructive/30 text-foreground";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-xl font-bold">Métricas</h1>
          <button
            onClick={() => navigate("/settings")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        
        {/* Pingüino + Viaje */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl">🐧</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">Tu viaje hacia una vida más saludable</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                Destino actual: Machu Picchu, Perú
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Llevas {journeySteps} pasos en tu viaje</span>
              <span className="font-medium">{Math.round((journeySteps / nextDestinationSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(journeySteps / nextDestinationSteps) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Faltan {nextDestinationSteps - journeySteps} pasos para el próximo destino
            </p>
          </div>
        </Card>

        {/* Progreso diario */}
        <div className="flex flex-col items-center py-4">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="hsl(var(--success))"
                strokeWidth="16"
                strokeDasharray={`${(todayProgress / 100) * 502.65} 502.65`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary">{todayProgress}%</span>
              <span className="text-xs text-muted-foreground">Progreso de hoy</span>
            </div>
          </div>
        </div>

        {/* Calendario */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Adherencia mensual</h3>
          <div className="grid grid-cols-7 gap-1.5 mb-3">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const completion = dayCompletions[i];
              const isToday = day === today;
              
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                    getDayColor(completion)
                  } ${isToday ? "ring-2 ring-primary" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Este mes: {greenDays} días verdes, {yellowDays} amarillos, {redDays} rojos
          </p>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center">
            <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">Días consecutivos</div>
          </Card>
          <Card className="p-4 text-center">
            <Award className="h-5 w-5 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{perfectDays}</div>
            <div className="text-xs text-muted-foreground">Días perfectos</div>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="h-5 w-5 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{habitsCompleted}</div>
            <div className="text-xs text-muted-foreground">Hábitos realizados</div>
          </Card>
          <Card className="p-4 text-center">
            <BarChart3 className="h-5 w-5 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">{dailyAverage}</div>
            <div className="text-xs text-muted-foreground">Promedio diario</div>
          </Card>
        </div>

        {/* Métricas de salud */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Tus métricas de salud</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Droplet className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">120 mg/dL</div>
              <div className="text-xs text-muted-foreground">Glucosa promedio</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success mx-auto mb-1" />
              <div className="text-lg font-bold">18 días</div>
              <div className="text-xs text-muted-foreground">Dentro de rango</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Heart className="h-5 w-5 text-destructive mx-auto mb-1" />
              <div className="text-lg font-bold">120/80</div>
              <div className="text-xs text-muted-foreground">Presión arterial</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Activity className="h-5 w-5 text-accent mx-auto mb-1" />
              <div className="text-lg font-bold">95%</div>
              <div className="text-xs text-muted-foreground">Adherencia</div>
            </div>
          </div>
        </Card>

        {/* Aprendizaje */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Tu aprendizaje del mes
          </h3>
          <p className="text-sm text-muted-foreground mb-3">Completaste 3 de 6 módulos educativos</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Qué es la prediabetes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Cómo funciona la metformina</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Control de glucosa en casa</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 border-2 border-muted rounded" />
              <span>Alimentación inteligente</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 border-2 border-muted rounded" />
              <span>Ejercicio y diabetes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 border-2 border-muted rounded" />
              <span>Manejo del estrés</span>
            </div>
          </div>
        </Card>

        {/* Logros */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            Logros y recompensas
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <Medal className="h-6 w-6 text-accent mx-auto mb-1" />
              <div className="text-xs font-medium">7 días sin olvidar</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Plane className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-xs font-medium">Primer destino</div>
            </div>
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Trophy className="h-6 w-6 text-success mx-auto mb-1" />
              <div className="text-xs font-medium">70% adherencia</div>
            </div>
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-accent/10">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Insights de tu progreso
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              • Sueles cumplir más tus hábitos entre 7 pm y 10 pm
            </p>
            <p className="text-muted-foreground">
              • Tus mejores días son lunes y miércoles
            </p>
            <p className="text-muted-foreground">
              • Estás a 20 pasos de desbloquear un nuevo destino
            </p>
          </div>
        </Card>

      </main>

      <BottomNav />
    </div>
  );
};

export default Metrics;
