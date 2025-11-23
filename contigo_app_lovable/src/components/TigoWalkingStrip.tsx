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
  const totalTeamSteps = isTeam ? teamMembers.reduce((sum, member) => sum + member.steps, 0) : steps;
  const displaySteps = isTeam ? totalTeamSteps : steps;

  return (
    <div 
      className="bg-gradient-to-br from-secondary/30 to-accent/20 rounded-2xl p-6 relative overflow-hidden"
      style={{ minHeight: '200px' }}
    >
      {/* Step counter */}
      <div className="absolute top-4 right-4 bg-card/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
        <Footprints className="h-5 w-5 text-primary" />
        <span className="text-lg font-semibold">
          {displaySteps} pasos {isTeam ? 'equipo' : 'hoy'}
        </span>
      </div>

      {/* Walking path */}
      <div className="mt-16 mb-8">
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
                  <div className="flex flex-col items-center">
                    <img 
                      src={tigoPenguin} 
                      alt={`Tigo de ${member.name}`}
                      className="w-16 h-16 object-contain drop-shadow-lg"
                      style={{
                        transform: index === 1 ? 'scale(0.95)' : 'scale(1)', // Slightly smaller for depth
                      }}
                    />
                    <span className="text-xs font-medium text-foreground bg-card/90 px-2 py-1 rounded-full shadow-sm mt-1 whitespace-nowrap">
                      {member.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        {isTeam ? 'Avancen juntos completando actividades' : 'Completa actividades para avanzar'}
      </p>
    </div>
  );
};
