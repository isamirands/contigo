import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LucideIcon } from "lucide-react";

interface HabitCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export const HabitCard = ({ id, icon: Icon, title, description, completed, onToggle }: HabitCardProps) => {
  return (
    <Card 
      className={`p-5 transition-all cursor-pointer hover:shadow-md ${
        completed ? 'bg-success/10 border-success' : ''
      }`}
      onClick={() => onToggle(id)}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          id={id}
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="mt-1 h-7 w-7 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="h-6 w-6 text-primary flex-shrink-0" />
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};
