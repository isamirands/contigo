import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ActivityOwner {
  name: string;
  avatar?: string;
}

interface ActivityReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityTitle: string;
  activityOwners: ActivityOwner[];
  isTeam: boolean;
}

export const ActivityReminderModal = ({
  open,
  onOpenChange,
  activityTitle,
  activityOwners,
  isTeam,
}: ActivityReminderModalProps) => {
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [reminderTime, setReminderTime] = useState("now");

  const toggleMember = (memberName: string) => {
    setSelectedMembers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(memberName)) {
        newSet.delete(memberName);
      } else {
        newSet.add(memberName);
      }
      return newSet;
    });
  };

  const handleSendReminder = () => {
    if (selectedMembers.size === 0) {
      toast.error("Selecciona al menos un miembro");
      return;
    }

    const memberNames = Array.from(selectedMembers).join(", ");

    toast.success("Recordatorio creado", {
      description: `Para: ${memberNames} - ${activityTitle}`,
    });

    onOpenChange(false);
    setSelectedMembers(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            Recordatorio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Activity Name */}
          <div className="bg-secondary/30 p-3 rounded-lg">
            <p className="text-sm font-medium">{activityTitle}</p>
          </div>

          {/* Question */}
          <p className="text-sm text-muted-foreground">
            ¿A quién quieres enviarle un recordatorio para esta actividad?
          </p>

          {/* Activity Owners List - Only people assigned to this activity */}
          <div className="space-y-2">
            {activityOwners.map((owner, index) => (
              <button
                key={index}
                onClick={() => toggleMember(owner.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  selectedMembers.has(owner.name)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-sm bg-primary/10 text-primary font-medium">
                    {owner.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium flex-1 text-left">{owner.name}</span>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedMembers.has(owner.name)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedMembers.has(owner.name) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Time Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">¿Cuándo?</label>
            <select
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="now">Ahora</option>
              <option value="1hour">En 1 hora</option>
              <option value="tonight">Esta noche (8 PM)</option>
              <option value="tomorrow">Mañana (9 AM)</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSendReminder}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            disabled={selectedMembers.size === 0}
          >
            Enviar recordatorio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
