import tigoPenguin from "@/assets/tigo-penguin.png";
import { Footprints } from "lucide-react";

interface TigoWalkingStripProps {
  steps: number;
  progress: number; // 0-100
}

export const TigoWalkingStrip = ({ steps, progress }: TigoWalkingStripProps) => {
  return (
    <div className="bg-gradient-to-br from-secondary/30 to-accent/20 rounded-2xl p-6 relative overflow-hidden">
      {/* Step counter */}
      <div className="absolute top-4 right-4 bg-card/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
        <Footprints className="h-5 w-5 text-primary" />
        <span className="text-lg font-semibold">{steps} pasos hoy</span>
      </div>

      {/* Walking path */}
      <div className="mt-12 mb-4">
        <div className="relative h-2 bg-muted rounded-full">
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Tigo avatar positioned on the path */}
        <div 
          className="relative transition-all duration-500"
          style={{ 
            marginLeft: `${Math.max(0, Math.min(progress - 8, 92))}%`,
            marginTop: '-48px'
          }}
        >
          <img 
            src={tigoPenguin} 
            alt="Tigo caminando" 
            className="w-20 h-20 object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Completa actividades para avanzar
      </p>
    </div>
  );
};
