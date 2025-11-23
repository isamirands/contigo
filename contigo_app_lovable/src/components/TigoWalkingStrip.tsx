import tigoPenguin from "@/assets/tigo-walking-blue-penguin.png";
import { Footprints } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  steps: number;
}

interface TigoWalkingStripProps {
  steps: number;
  progress: number; // 0-100
  teamMembers?: TeamMember[];
}

export const TigoWalkingStrip = ({ steps, progress, teamMembers = [] }: TigoWalkingStripProps) => {
  const isTeam = teamMembers.length >= 2;
  // Format number with comma separator for readability
  const formattedSteps = steps.toLocaleString('es-ES');

  return (
    <div 
      className="bg-gradient-to-br from-secondary/30 to-accent/20 relative"
      style={{ height: '200px' }}
    >
      {/* Content container - centered with max width */}
      <div className="max-w-2xl mx-auto px-4 h-full flex flex-col relative">
        {/* Row 1: Top bar with step counter */}
        <div className="flex-shrink-0 py-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm border border-gray-200/50 w-fit">
            <Footprints className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">{formattedSteps}</span>
          </div>
        </div>

        {/* Row 2: Sky area - takes up most space */}
        <div className="flex-1 min-h-0" />

        {/* Row 3: Path and penguins area - positioned in lower third */}
        <div className="flex-shrink-0 pb-2">
          {/* Walking path */}
          <div className="mb-2">
            <div className="relative h-2 bg-muted rounded-full">
              <div 
                className="absolute h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          
            {/* Single Tigo (no team) */}
            {!isTeam && (
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
            )}

            {/* Multiple Tigos (team) */}
            {isTeam && (
              <div className="relative" style={{ marginTop: '-48px', minHeight: '80px' }}>
                {teamMembers.map((member, index) => {
                  // Calculate individual progress for each member
                  const maxSteps = Math.max(...teamMembers.map(m => m.steps));
                  const memberProgress = maxSteps > 0 ? (member.steps / maxSteps) * progress : progress;
                  
                  // Offset each Tigo slightly to show them side by side
                  const horizontalOffset = index * 6; // 6% offset between members
                  const position = Math.max(0, Math.min(memberProgress - 8 + horizontalOffset, 92));
                  
                  return (
                    <div
                      key={member.id}
                      className="absolute transition-all duration-500"
                      style={{
                        left: `${position}%`,
                        top: index === 1 ? '8px' : '0px', // Slight vertical offset for second member
                      }}
                    >
                      <img 
                        src={tigoPenguin} 
                        alt={`Tigo de ${member.name}`}
                        className="w-16 h-16 object-contain drop-shadow-lg"
                        style={{
                          transform: index === 1 ? 'scale(0.95)' : 'scale(1)', // Slightly smaller for depth
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Message text - positioned at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 pb-1">
          <p className="text-center text-xs text-muted-foreground">
            {isTeam ? 'Avancemos juntos completando actividades' : 'Completa actividades para avanzar'}
          </p>
        </div>
      </div>
    </div>
  );
};
