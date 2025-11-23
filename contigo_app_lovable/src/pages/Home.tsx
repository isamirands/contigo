import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { TigoWalkingStrip } from "@/components/TigoWalkingStrip";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { ActivitySliderCard } from "@/components/ActivitySliderCard";
import { ActivityReminderModal } from "@/components/ActivityReminderModal";
import { CompletionCelebration } from "@/components/CompletionCelebration";
import { EducationalModal } from "@/components/EducationalModal";
import { Pill, Droplet, Footprints, BookOpen, Moon } from "lucide-react";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";
import { getCurrentUserTeamTotalSteps } from "@/data/teamsData";

// Types
interface Activity {
  id: string;
  icon: LucideIcon;
  title: string;
  owners: Array<{ name: string; avatar?: string }>;
}

interface TeamMemberData {
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

// Get team members from localStorage (synced with Teams page)
const getTeamMembersFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem('teamMembers');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading team members from storage:', e);
  }
  // Default team members
  return ["user1", "user2"];
};

// Mock data: Team members with their activities
// Set to empty array to test solo mode, or populate for team mode
const buildTeamMembers = (memberIds: string[]): TeamMemberData[] => {
  const allMembers: { [key: string]: TeamMemberData } = {
    "user1": {
      id: "user1",
      name: "Tú",
      activities: CURRENT_USER_ACTIVITIES,
    },
    "user2": {
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
  };
  
  return memberIds.map(id => allMembers[id]).filter(Boolean);
};

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
  const navigate = useNavigate();
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<{ 
    id: string; 
    title: string; 
    owners?: Array<{ name: string; avatar?: string }>;
  } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [educationalModalOpen, setEducationalModalOpen] = useState(false);
  const [educationalActivityId, setEducationalActivityId] = useState<string | null>(null);
  // Cumulative total steps since journey started (never resets)
  // MUST be 122 to match team data
  const [totalStepsSinceStart, setTotalStepsSinceStart] = useState(getCurrentUserTeamTotalSteps());
  
  // Team members state - synced with localStorage
  const [teamMemberIds, setTeamMemberIds] = useState<string[]>(getTeamMembersFromStorage());
  const TEAM_MEMBERS = useMemo(() => buildTeamMembers(teamMemberIds), [teamMemberIds]);

  // Listen for team member changes from Teams page
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teamMembers' && e.newValue) {
        try {
          const newIds = JSON.parse(e.newValue);
          setTeamMemberIds(newIds);
        } catch (err) {
          console.error('Error parsing team members:', err);
        }
      }
    };
    
    // Also listen for custom event (for same-window updates)
    const handleTeamUpdate = () => {
      setTeamMemberIds(getTeamMembersFromStorage());
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('teamMembersUpdated', handleTeamUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('teamMembersUpdated', handleTeamUpdate);
    };
  }, []);

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
      const newTotal = totalStepsSinceStart + 1;
      setTotalStepsSinceStart(newTotal);
      
      // Save to localStorage for Teams page sync
      try {
        localStorage.setItem('totalStepsSinceStart', newTotal.toString());
        window.dispatchEvent(new Event('totalStepsUpdated'));
      } catch (e) {
        console.error('Error saving total steps:', e);
      }
      
      // Show celebration overlay
      setShowCelebration(true);
    }
  };

  const handleEducationalClick = (id: string) => {
    setEducationalActivityId(id);
    setEducationalModalOpen(true);
  };

  const handleEducationalConfirm = () => {
    // Solo se llama cuando el usuario presiona "Confirmar lectura"
    if (educationalActivityId && !completedActivities.includes(educationalActivityId)) {
      handleCompleteActivity(educationalActivityId);
    }
    setEducationalModalOpen(false);
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
      {/* Unified Header */}
      <UnifiedHeader title="Hoy" />

      {/* Section 1: Tigo Walking Strip - Full-width strip at top */}
      <div className="flex-shrink-0">
        <TigoWalkingStrip 
          steps={totalStepsSinceStart} 
          progress={progress} 
          teamMembers={tigoTeamMembers}
          onClick={() => navigate("/global-journey")}
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
                onEducationalClick={() => handleEducationalClick(activity.id)}
                onReminder={(id, title) => {
                  setSelectedActivity({ id, title, owners: activity.owners });
                  setReminderModalOpen(true);
                }}
                owners={activity.owners}
                colorIndex={index}
              />
            ))}
          </div>
        </div>

      </main>

      <BottomNav />

      {/* Activity Reminder Modal */}
      {selectedActivity && (
        <ActivityReminderModal
          open={reminderModalOpen}
          onOpenChange={setReminderModalOpen}
          activityTitle={selectedActivity.title}
          activityOwners={selectedActivity.owners || []}
          isTeam={isTeam}
        />
      )}

      {/* Completion Celebration */}
      <CompletionCelebration
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />

      {/* Educational Modal */}
      <EducationalModal
        open={educationalModalOpen}
        onOpenChange={setEducationalModalOpen}
        onConfirm={handleEducationalConfirm}
      />
    </div>
  );
};

export default Home;
