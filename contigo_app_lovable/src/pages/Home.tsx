import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { TigoWalkingStrip } from "@/components/TigoWalkingStrip";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { ActivitySliderCard } from "@/components/ActivitySliderCard";
import { Button } from "@/components/ui/button";
import { Pill, Droplet, Footprints, BookOpen, Plus, Bell } from "lucide-react";
import { toast } from "sonner";

const ACTIVITIES = [
  {
    id: "medication-morning",
    icon: Pill,
    title: "Medicación matutina",
    owners: [{ name: "María", avatar: "" }],
  },
  {
    id: "water-1",
    icon: Droplet,
    title: "Beber agua (1L)",
    owners: [{ name: "María", avatar: "" }],
  },
  {
    id: "exercise",
    icon: Footprints,
    title: "Caminata de 15 min",
    owners: [{ name: "María", avatar: "" }, { name: "Carlos", avatar: "" }],
  },
  {
    id: "education",
    icon: BookOpen,
    title: "Leer artículo educativo",
    owners: [{ name: "Carlos", avatar: "" }],
  },
  {
    id: "medication-evening",
    icon: Pill,
    title: "Medicación nocturna",
    owners: [{ name: "María", avatar: "" }],
  },
];

// Dummy week data
const WEEK_DATA = [
  { day: "L", date: 16, steps: 18, progress: 75, isToday: false },
  { day: "M", date: 17, steps: 22, progress: 100, isToday: false },
  { day: "M", date: 18, steps: 16, progress: 67, isToday: false },
  { day: "J", date: 19, steps: 20, progress: 83, isToday: false },
  { day: "V", date: 20, steps: 24, progress: 100, isToday: false },
  { day: "S", date: 21, steps: 19, progress: 79, isToday: false },
  { day: "D", date: 22, steps: 12, progress: 50, isToday: true },
];

const Home = () => {
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const handleCompleteActivity = (id: string) => {
    if (!completedActivities.includes(id)) {
      setCompletedActivities((prev) => [...prev, id]);
      toast.success("¡Excelente! Tigo avanza un paso más", {
        description: "Tu equipo también se beneficia de tu progreso",
      });
    }
  };

  const progress = (completedActivities.length / ACTIVITIES.length) * 100;
  const totalSteps = WEEK_DATA.find(d => d.isToday)?.steps || 0;

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border flex-shrink-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Contigo</h1>
          <p className="text-sm text-muted-foreground mt-1">Juntos en tu camino</p>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <div className="px-4 pt-6 space-y-6">
          {/* Section 1: Tigo Walking Strip */}
          <TigoWalkingStrip steps={totalSteps} progress={progress} />

          {/* Section 2: Weekly Calendar */}
          <WeeklyCalendar weekData={WEEK_DATA} />

          {/* Section 3 Header */}
          <h2 className="text-xl font-semibold">Actividades de hoy</h2>
        </div>

        {/* Section 3: Scrollable Activities List - Fixed height for 5 cards */}
        <div className="px-4 py-4 overflow-y-auto" style={{ height: '640px' }}>
          <div className="space-y-4">
            {ACTIVITIES.map((activity, index) => (
              <ActivitySliderCard
                key={activity.id}
                id={activity.id}
                icon={activity.icon}
                title={activity.title}
                completed={completedActivities.includes(activity.id)}
                onComplete={handleCompleteActivity}
                owners={activity.owners}
                colorIndex={index}
              />
            ))}
          </div>
        </div>

        {/* Section 4: Actions Area - Fixed at bottom */}
        <div className="px-4 pb-6 pt-4 space-y-3 bg-background border-t border-border">
          <Button 
            size="lg" 
            className="w-full h-14 text-lg"
            onClick={() => toast.info("Función 'Agregar actividad' próximamente")}
          >
            <Plus className="h-6 w-6" />
            Agregar actividad
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full h-14 text-lg"
            onClick={() => toast.info("Función 'Recordatorios' próximamente")}
          >
            <Bell className="h-6 w-6" />
            Recordatorios
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
