import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Pencil, HandMetal, DoorOpen, Camera, Trophy } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TigoProfileBluePenguin from "@/assets/tigo-profile-blue-penguin.png";
import { getCurrentUserTeam } from "@/data/teamsData";

// IMPORTANT: This must match the TEAM_MEMBERS structure in Home.tsx
// to ensure consistency between the Tigo journey and the team list
interface TeamMember {
  id: string;
  name: string;
  totalSteps: number; // Individual member's contribution to team total
}

// Per-member contributions that sum to team total (122)
const ALL_TEAM_MEMBERS: TeamMember[] = [
  { id: "user1", name: "Tú", totalSteps: 82 },
  { id: "user2", name: "Ana", totalSteps: 40 },
];

// Get total steps from shared team data (must be 122)
const getTotalStepsFromStorage = (): number => {
  const currentTeam = getCurrentUserTeam();
  return currentTeam.totalSteps; // Returns 122
};

interface TeamInfo {
  name: string;
  description: string;
  treatmentTypes: string[];
}

const INITIAL_TEAM_INFO: TeamInfo = {
  name: "Familia Contigo",
  description: "Juntos somos más fuertes en nuestro camino hacia el bienestar",
  treatmentTypes: ["Diabetes"],
};

// Get team members from localStorage
const getTeamMembersFromStorage = (): TeamMember[] => {
  try {
    const stored = localStorage.getItem('teamMembers');
    if (stored) {
      const ids: string[] = JSON.parse(stored);
      return ALL_TEAM_MEMBERS.filter(m => ids.includes(m.id));
    }
  } catch (e) {
    console.error('Error reading team members from storage:', e);
  }
  // Default: all members
  return ALL_TEAM_MEMBERS;
};

// Save team members to localStorage
const saveTeamMembersToStorage = (members: TeamMember[]) => {
  try {
    const ids = members.map(m => m.id);
    localStorage.setItem('teamMembers', JSON.stringify(ids));
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new Event('teamMembersUpdated'));
  } catch (e) {
    console.error('Error saving team members to storage:', e);
  }
};

const Teams = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(getTeamMembersFromStorage());
  const [teamInfo, setTeamInfo] = useState(INITIAL_TEAM_INFO);
  const [totalSteps, setTotalSteps] = useState(getTotalStepsFromStorage());
  
  // Sync team members to localStorage whenever they change
  useEffect(() => {
    saveTeamMembersToStorage(teamMembers);
  }, [teamMembers]);

  // Listen for total steps changes from Home page
  useEffect(() => {
    const handleStepsUpdate = () => {
      setTotalSteps(getTotalStepsFromStorage());
    };
    
    window.addEventListener('totalStepsUpdated', handleStepsUpdate);
    
    return () => {
      window.removeEventListener('totalStepsUpdated', handleStepsUpdate);
    };
  }, []);

  // Team total steps comes from Home (single source of truth)
  // This is the cumulative total shown in the Tigo journey
  const teamTotalSteps = totalSteps;
  
  // Calculate what percentage each member has contributed
  // This ensures member totals sum to team total
  const memberStepsData = teamMembers.map((member, index) => {
    // Distribute steps proportionally based on mock data ratios
    const ratio = member.totalSteps / ALL_TEAM_MEMBERS.reduce((sum, m) => sum + m.totalSteps, 0);
    const calculatedSteps = Math.round(teamTotalSteps * ratio);
    return {
      ...member,
      displaySteps: calculatedSteps,
    };
  });
  const [editTeamOpen, setEditTeamOpen] = useState(false);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  
  // Edit form state
  const [editName, setEditName] = useState(teamInfo.name);
  const [editDescription, setEditDescription] = useState(teamInfo.description);
  const [editTreatmentTypes, setEditTreatmentTypes] = useState(teamInfo.treatmentTypes.join(", "));

  // Swipe state
  const [swipedMemberId, setSwipedMemberId] = useState<string | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState<{ [key: string]: number }>({});

  const handleSaveTeamInfo = () => {
    setTeamInfo({
      name: editName,
      description: editDescription,
      treatmentTypes: editTreatmentTypes.split(",").map(t => t.trim()).filter(t => t),
    });
    setEditTeamOpen(false);
    toast.success("Información del equipo actualizada");
  };

  const handleNudgeMember = (memberName: string) => {
    toast.success(`Recordatorio enviado a ${memberName} para abrir la app`);
    setSwipedMemberId(null);
    setDragOffsetX({});
  };

  const handleRemoveMember = (memberId: string) => {
    setMemberToRemove(memberId);
    setConfirmRemoveOpen(true);
  };

  const confirmRemoveMember = () => {
    if (memberToRemove) {
      const member = teamMembers.find(m => m.id === memberToRemove);
      setTeamMembers(prev => prev.filter(m => m.id !== memberToRemove));
      toast.success(`${member?.name} ha sido eliminado del equipo`);
      setSwipedMemberId(null);
      setDragOffsetX({});
    }
    setConfirmRemoveOpen(false);
    setMemberToRemove(null);
  };

  // Close any open card
  const closeCard = (memberId: string) => {
    setDragOffsetX(prev => ({ ...prev, [memberId]: 0 }));
    if (swipedMemberId === memberId) {
      setSwipedMemberId(null);
    }
  };

  // Close all cards
  const closeAllCards = () => {
    setDragOffsetX({});
    setSwipedMemberId(null);
  };

  const handleTouchStart = (e: React.TouchEvent, memberId: string) => {
    const touch = e.touches[0];
    setDragStartX(touch.clientX);
    setDragStartY(touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent, memberId: string) => {
    if (dragStartX === null || dragStartY === null) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartX;
    const deltaY = touch.clientY - dragStartY;
    
    // Only trigger horizontal swipe if movement is primarily horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault();
      
      const currentOffset = dragOffsetX[memberId] || 0;
      
      // Allow both left and right swipe
      // Left swipe: negative deltaX (opens card)
      // Right swipe: positive deltaX (closes card)
      let newOffset = currentOffset + deltaX - (dragStartX - touch.clientX);
      
      // Constrain offset: 0 (closed) to -160 (fully open)
      newOffset = Math.max(-160, Math.min(0, newOffset));
      
      setDragOffsetX(prev => ({ ...prev, [memberId]: newOffset }));
      setDragStartX(touch.clientX);
      setDragStartY(touch.clientY);
    }
  };

  const handleTouchEnd = (memberId: string) => {
    const offset = dragOffsetX[memberId] || 0;
    
    // If swiped more than 80px left, snap to open position
    if (offset < -80) {
      setSwipedMemberId(memberId);
      setDragOffsetX(prev => ({ ...prev, [memberId]: -160 }));
      // Close other cards
      Object.keys(dragOffsetX).forEach(id => {
        if (id !== memberId) {
          closeCard(id);
        }
      });
    } else {
      // Otherwise, snap back to closed
      closeCard(memberId);
    }
    
    setDragStartX(null);
    setDragStartY(null);
  };

  const handleMouseDown = (e: React.MouseEvent, memberId: string) => {
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent, memberId: string) => {
    if (dragStartX === null || dragStartY === null) return;
    
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      const currentOffset = dragOffsetX[memberId] || 0;
      
      // Allow both left and right swipe
      let newOffset = currentOffset + deltaX - (dragStartX - e.clientX);
      
      // Constrain offset: 0 (closed) to -160 (fully open)
      newOffset = Math.max(-160, Math.min(0, newOffset));
      
      setDragOffsetX(prev => ({ ...prev, [memberId]: newOffset }));
      setDragStartX(e.clientX);
      setDragStartY(e.clientY);
    }
  };

  const handleMouseUp = (memberId: string) => {
    const offset = dragOffsetX[memberId] || 0;
    
    if (offset < -80) {
      setSwipedMemberId(memberId);
      setDragOffsetX(prev => ({ ...prev, [memberId]: -160 }));
      // Close other cards
      Object.keys(dragOffsetX).forEach(id => {
        if (id !== memberId) {
          closeCard(id);
        }
      });
    } else {
      closeCard(memberId);
    }
    
    setDragStartX(null);
    setDragStartY(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Mi Equipo</h1>
          <p className="text-sm text-muted-foreground mt-1">Juntos somos más fuertes</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Team Info Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold">{teamInfo.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{teamInfo.description}</p>
            </div>
            <button
              onClick={() => {
                setEditName(teamInfo.name);
                setEditDescription(teamInfo.description);
                setEditTreatmentTypes(teamInfo.treatmentTypes.join(", "));
                setEditTeamOpen(true);
              }}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
              aria-label="Editar equipo"
            >
              <Pencil className="h-5 w-5 text-primary" />
            </button>
          </div>
          
          <div className="pt-3 border-t border-border/50 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers.length}</span> miembros en el equipo
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Pasos totales del equipo</p>
              <p className="text-2xl font-bold text-primary">{teamTotalSteps.toLocaleString('es-ES')}</p>
            </div>
          </div>
        </Card>

        {/* Scoreboard Entry Point */}
        <Card 
          className="p-4 mb-6 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => navigate("/scoreboard")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Ver ranking de equipos</h3>
              <p className="text-sm text-muted-foreground">Compara tu progreso con otros equipos</p>
            </div>
          </div>
        </Card>

        {/* Team Members */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Miembros</h2>
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => toast.info("Función de añadir miembro próximamente")}
            >
              <Users className="h-4 w-4" />
              Añadir miembro
            </Button>
          </div>

          <div className="space-y-3">
            {memberStepsData.map((member) => {
              const offset = dragOffsetX[member.id] || 0;
              
              return (
                <div key={member.id} className="relative overflow-hidden rounded-lg">
                  {/* Action buttons - revealed on swipe left */}
                  <div className="absolute right-0 top-0 bottom-0 flex items-center gap-2 pr-3">
                    {/* Nudge button */}
                    <button
                      onClick={() => handleNudgeMember(member.name)}
                      className="w-16 h-16 rounded-2xl bg-pink-100 hover:bg-pink-200 flex flex-col items-center justify-center gap-1 transition-colors shadow-sm"
                      aria-label="Recordar abrir app"
                    >
                      <HandMetal className="h-5 w-5 text-pink-600" />
                      <span className="text-[10px] font-medium text-pink-700">Recordar</span>
                    </button>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="w-16 h-16 rounded-2xl bg-red-100 hover:bg-red-200 flex flex-col items-center justify-center gap-1 transition-colors shadow-sm"
                      aria-label="Eliminar del equipo"
                    >
                      <DoorOpen className="h-5 w-5 text-red-600" />
                      <span className="text-[10px] font-medium text-red-700">Eliminar</span>
                    </button>
                  </div>

                  {/* Member card - swipeable */}
                  <Card 
                    className="p-4 cursor-grab active:cursor-grabbing relative bg-card"
                    style={{
                      transform: `translateX(${offset}px)`,
                      transition: dragStartX === null ? 'transform 0.3s ease-out' : 'none',
                    }}
                    onTouchStart={(e) => handleTouchStart(e, member.id)}
                    onTouchMove={(e) => handleTouchMove(e, member.id)}
                    onTouchEnd={() => handleTouchEnd(member.id)}
                    onMouseDown={(e) => handleMouseDown(e, member.id)}
                    onMouseMove={(e) => dragStartX !== null && handleMouseMove(e, member.id)}
                    onMouseUp={() => handleMouseUp(member.id)}
                    onMouseLeave={() => dragStartX !== null && handleMouseUp(member.id)}
                    onClick={() => {
                      // Tap to close if card is open
                      if (swipedMemberId === member.id) {
                        closeCard(member.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Tigo profile avatar */}
                      <div className="w-12 h-12 flex-shrink-0">
                        <img 
                          src={TigoProfileBluePenguin} 
                          alt={`Avatar de ${member.name}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.displaySteps.toLocaleString('es-ES')} pasos
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <BottomNav />

      {/* Edit Team Info Dialog */}
      <Dialog open={editTeamOpen} onOpenChange={setEditTeamOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar información del equipo</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Team Photo Section */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                {/* Team avatar/photo */}
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                
                {/* Camera icon overlay - change photo affordance */}
                <button
                  type="button"
                  onClick={() => {
                    console.log("Change team photo clicked");
                    toast.info("Cambiar foto del equipo - próximamente");
                  }}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-colors"
                  aria-label="Cambiar foto del equipo"
                >
                  <Camera className="h-4 w-4 text-primary-foreground" />
                </button>
              </div>
              
              {/* Change photo text */}
              <button
                type="button"
                onClick={() => {
                  console.log("Change team photo clicked");
                  toast.info("Cambiar foto del equipo - próximamente");
                }}
                className="text-sm text-primary hover:underline"
              >
                Cambiar foto
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-name">Nombre del equipo</Label>
              <Input
                id="team-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Ej: Familia Contigo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-description">Descripción</Label>
              <Textarea
                id="team-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Describe tu equipo..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="treatment-types">Tipos de tratamiento</Label>
              <Input
                id="treatment-types"
                value={editTreatmentTypes}
                onChange={(e) => setEditTreatmentTypes(e.target.value)}
                placeholder="Ej: Diabetes, Hipertensión (separados por comas)"
              />
              <p className="text-xs text-muted-foreground">
                Separa múltiples tratamientos con comas
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTeamOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTeamInfo}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Remove Member Dialog */}
      <Dialog open={confirmRemoveOpen} onOpenChange={setConfirmRemoveOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminar miembro</DialogTitle>
          </DialogHeader>
          
          <p className="text-sm text-muted-foreground py-4">
            ¿Seguro que quieres eliminar a{" "}
            <span className="font-semibold text-foreground">
              {teamMembers.find(m => m.id === memberToRemove)?.name}
            </span>{" "}
            de tu equipo?
          </p>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmRemoveOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmRemoveMember}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teams;
