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

// Dummy week data - showing last 7 days with activity completion
const WEEK_DATA = [
  { day: "L", date: 16, totalActivities: 4, completedActivities: 3, isToday: false },
  { day: "M", date: 17, totalActivities: 5, completedActivities: 5, isToday: false },
  { day: "M", date: 18, totalActivities: 4, completedActivities: 2, isToday: false },
  { day: "J", date: 19, totalActivities: 6, completedActivities: 5, isToday: false },
  { day: "V", date: 20, totalActivities: 4, completedActivities: 4, isToday: false },
  { day: "S", date: 21, totalActivities: 3, completedActivities: 2, isToday: false },
  { day: "D", date: 22, totalActivities: 5, completedActivities: 2, isToday: true },
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
  
  // Update week data with real-time completion for today
  const updatedWeekData = WEEK_DATA.map(day => {
    if (day.isToday) {
      return {
        ...day,
        totalActivities: ACTIVITIES.length,
        completedActivities: completedActivities.length,
      };
    }
    return day;
  });
  
  const todayData = updatedWeekData.find(d => d.isToday);
  const totalSteps = todayData ? Math.round((todayData.completedActivities / todayData.totalActivities) * 24) : 0;

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
          <WeeklyCalendar 
            weekData={updatedWeekData} 
            onDayClick={(date) => toast.info(`Ver actividades del día ${date}`)}
          />

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
