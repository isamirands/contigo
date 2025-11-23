import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

interface UnifiedHeaderProps {
  title: string;
}

export const UnifiedHeader = ({ title }: UnifiedHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border flex-shrink-0">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-center relative">
        {/* Centered title */}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        
        {/* Settings icon - top right */}
        <button
          onClick={() => navigate("/settings")}
          className="absolute right-4 p-2 hover:bg-secondary rounded-full transition-colors"
          aria-label="Ajustes"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};
