import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Send } from "lucide-react";
import { LucideIcon } from "lucide-react";

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

interface RemindersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userActivities: Activity[];
  teamMembers?: TeamMember[];
  isTeam: boolean;
}

export const RemindersModal = ({
  open,
  onOpenChange,
  userActivities,
  teamMembers = [],
  isTeam,
}: RemindersModalProps) => {
  const handleAddReminder = (activityTitle: string) => {
    // Mock action for now
    console.log(`Add reminder for: ${activityTitle}`);
  };

  const handleSendTeamReminder = (memberName: string, activityTitle: string) => {
    // Mock action for now
    console.log(`Send reminder to ${memberName} for: ${activityTitle}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Recordatorios
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Reminders Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Recordatorios personales</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configura recordatorios para completar tus actividades a tiempo.
            </p>
            
            <div className="space-y-3">
              {userActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{activity.title}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddReminder(activity.title)}
                    className="gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Agregar
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Team Reminders Section - Only show if user is in a team */}
          {isTeam && teamMembers.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Recordatorios del equipo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Envía un recordatorio rápido a alguien de tu equipo para ayudarle a completar su actividad.
              </p>

              <div className="space-y-4">
                {teamMembers
                  .filter((member) => member.id !== "user1") // Don't show current user
                  .map((member) => (
                    <div key={member.id} className="space-y-2">
                      <h4 className="font-semibold text-sm text-primary">{member.name}</h4>
                      <div className="space-y-2">
                        {member.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 bg-accent/20 rounded-lg hover:bg-accent/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <activity.icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{activity.title}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendTeamReminder(member.name, activity.title)}
                              className="gap-2"
                            >
                              <Send className="h-4 w-4" />
                              Enviar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
