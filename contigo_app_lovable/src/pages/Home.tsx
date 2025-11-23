import { useState, useMemo } from "react";
import { BottomNav } from "@/components/BottomNav";
import { TigoWalkingStrip } from "@/components/TigoWalkingStrip";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { ActivitySliderCard } from "@/components/ActivitySliderCard";
import { RemindersModal } from "@/components/RemindersModal";
import { Button } from "@/components/ui/button";
import { Pill, Droplet, Footprints, BookOpen, Plus, Bell, Moon } from "lucide-react";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

// Types
interface Activity {
  id: string;
  icon: LucideIcon;
  title: string;
  owners: Array<{ name: string; avatar?: string }>;
}

interface TeamMember {
  id: string;
  name: string;
  activities: Activity[];
}

// Mock data: Current user's activities
const CURRENT_USER_ACTIVITIES: Activity[] = [
  {
    id: "user1-medication-morning",
    icon: Pill,
    title: "Medicación matutina",
    owners: [{ name: "Tú", avatar: "" }],
  },
  {
    id: "user1-water",
    icon: Droplet,
    title: "Beber agua (1L)",
    owners: [{ name: "Tú", avatar: "" }],
  },
  {
    id: "user1-exercise",
    icon: Footprints,
    title: "Caminata de 15 min",
    owners: [{ name: "Tú", avatar: "" }],
  },
];

// Mock data: Team members with their activities
// Set to empty array to test solo mode, or populate for team mode
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "user1",
    name: "Tú",
    activities: CURRENT_USER_ACTIVITIES,
  },
  {
    id: "user2",
    name: "Ana",
    activities: [
      {
        id: "user2-medication-evening",
        icon: Pill,
        title: "Medicación nocturna",
        owners: [{ name: "Ana", avatar: "" }],
      },
      {
        id: "user2-reading",
        icon: BookOpen,
        title: "Leer artículo educativo",
        owners: [{ name: "Ana", avatar: "" }],
      },
      {
        id: "user2-meditation",
        icon: Moon,
        title: "Meditación 10 min",
        owners: [{ name: "Ana", avatar: "" }],
      },
    ],
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
  const [remindersModalOpen, setRemindersModalOpen] = useState(false);
  // Cumulative total steps since journey started (never resets)
  const [totalStepsSinceStart, setTotalStepsSinceStart] = useState(42); // Mock starting value

  // Determine if user is in a team (team has 2+ members)
  const isTeam = TEAM_MEMBERS.length >= 2;

  // Build shared activity pool
  const activityPool = useMemo(() => {
    if (!isTeam) {
      // Solo mode: only current user's activities
      return CURRENT_USER_ACTIVITIES;
    }
    
    // Team mode: combine all activities from all team members
    const allActivities: Activity[] = [];
    const activityMap = new Map<string, Activity>();
    
    TEAM_MEMBERS.forEach(member => {
      member.activities.forEach(activity => {
        // Check if activity with same title already exists (shared activity)
        const existingActivity = Array.from(activityMap.values()).find(
          a => a.title === activity.title
        );
        
        if (existingActivity) {
          // Merge owners for shared activities
          const ownerNames = new Set(existingActivity.owners.map(o => o.name));
          activity.owners.forEach(owner => {
            if (!ownerNames.has(owner.name)) {
              existingActivity.owners.push(owner);
            }
          });
        } else {
          // Add new activity to the pool
          activityMap.set(activity.id, { ...activity });
        }
      });
    });
    
    return Array.from(activityMap.values());
  }, [isTeam]);

  const handleCompleteActivity = (id: string) => {
    if (!completedActivities.includes(id)) {
      setCompletedActivities((prev) => [...prev, id]);
      // Increment cumulative total steps (never resets)
      setTotalStepsSinceStart((prev) => prev + 1);
      
      if (isTeam) {
        toast.success("¡Excelente! Todo el equipo avanza", {
          description: "Juntos llegamos más lejos",
        });
      } else {
        toast.success("¡Excelente! Tigo avanza un paso más", {
          description: "Sigue así, vas muy bien",
        });
      }
    }
  };

  // Calculate progress based on activity pool
  const progress = activityPool.length > 0 
    ? (completedActivities.length / activityPool.length) * 100 
    : 0;
  
  // Calculate team steps (shared progress for all Tigos)
  const teamSteps = Math.round((completedActivities.length / activityPool.length) * 24);
  
  // Update week data with real-time completion for today
  const updatedWeekData = WEEK_DATA.map(day => {
    if (day.isToday) {
      return {
        ...day,
        totalActivities: activityPool.length,
        completedActivities: completedActivities.length,
      };
    }
    return day;
  });
  
  // Prepare team members data for Tigo journey
  const tigoTeamMembers = isTeam 
    ? TEAM_MEMBERS.map(member => ({
        id: member.id,
        name: member.name,
        steps: teamSteps, // All Tigos use the same shared team steps
      }))
    : [];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header - Fixed at top */}
      <header className="bg-card border-b border-border flex-shrink-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Contigo</h1>
          <p className="text-sm text-muted-foreground mt-1">Juntos en tu camino</p>
        </div>
      </header>

      {/* Section 1: Tigo Walking Strip - Full-width strip at top */}
      <div className="flex-shrink-0">
        <TigoWalkingStrip 
          steps={totalStepsSinceStart} 
          progress={progress} 
          teamMembers={tigoTeamMembers}
        />
      </div>

      {/* Main content - Flex column that fills remaining space */}
      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full overflow-hidden">
        {/* Section 2: Weekly Calendar - Fixed below Tigo */}
        <div className="flex-shrink-0 px-4 pt-6">
          <WeeklyCalendar 
            weekData={updatedWeekData} 
            onDayClick={(date) => toast.info(`Ver actividades del día ${date}`)}
          />
        </div>

        {/* Section 3 Header */}
        <div className="flex-shrink-0 px-4 pt-6">
          <h2 className="text-xl font-semibold">
            {isTeam ? 'Actividades del equipo' : 'Actividades de hoy'}
          </h2>
        </div>

        {/* Section 3: Activities List - Scrollable area that takes remaining space */}
        <div className="flex-1 px-4 py-3 overflow-y-auto min-h-0">
          <div className="space-y-2.5">
            {activityPool.map((activity, index) => (
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

        {/* Section 4: Reminders Button - Fixed at bottom */}
        <div className="flex-shrink-0 px-4 pb-6 pt-4 bg-background border-t border-border">
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full h-14 text-lg"
            onClick={() => setRemindersModalOpen(true)}
          >
            <Bell className="h-6 w-6" />
            Recordatorios
          </Button>
        </div>
      </main>

      <BottomNav />

      {/* Reminders Modal */}
      <RemindersModal
        open={remindersModalOpen}
        onOpenChange={setRemindersModalOpen}
        userActivities={CURRENT_USER_ACTIVITIES}
        teamMembers={TEAM_MEMBERS}
        isTeam={isTeam}
      />
    </div>
  );
};

export default Home;
