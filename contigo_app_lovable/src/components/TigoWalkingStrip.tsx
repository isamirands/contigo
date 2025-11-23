import tigoPenguin from "@/assets/tigo-walking-blue-penguin.png";
import TigoJourneyBg from "@/assets/Sendero-penguin.png";
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
      className="relative"
      style={{ 
        height: '200px',
        backgroundImage: `url(${TigoJourneyBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle overlay for better content visibility */}
      <div className="absolute inset-0 bg-white/10" />
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

        {/* Row 3: Path and penguins area - positioned in lower third, moved 20px lower */}
        <div className="flex-shrink-0" style={{ paddingBottom: '12px' }}>
          {/* Walking path - moved 17px lower (20px - 3px adjustment) */}
          <div className="mb-2" style={{ transform: 'translateY(17px)' }}>
            <div className="relative h-2 bg-muted rounded-full">
              <div 
                className="absolute h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          
            {/* Single Tigo (no team) - 1.3x larger */}
            {!isTeam && (
              <div 
                className="relative"
                style={{ 
                  marginLeft: `${Math.max(0, Math.min(progress - 8, 92))}%`,
                  marginTop: '-62px', // Adjusted for larger penguin (was -48px)
                  transition: 'margin-left 500ms ease-out'
                }}
              >
                <img 
                  src={tigoPenguin} 
                  alt="Tigo caminando" 
                  className="object-contain drop-shadow-lg"
                  style={{ 
                    width: '104px', 
                    height: '104px',
                    minWidth: '104px',
                    minHeight: '104px',
                    maxWidth: '104px',
                    maxHeight: '104px'
                  }}
                />
              </div>
            )}

            {/* Multiple Tigos (team) - 1.3x larger */}
            {isTeam && (
              <div className="relative" style={{ marginTop: '-62px', minHeight: '104px' }}> {/* Adjusted for larger penguins */}
                {teamMembers.map((member, index) => {
                  // Calculate individual progress for each member
                  const maxSteps = Math.max(...teamMembers.map(m => m.steps));
                  const memberProgress = maxSteps > 0 ? (member.steps / maxSteps) * progress : progress;
                  
                  // Offset each Tigo slightly to show them side by side
                  const horizontalOffset = index * 6; // 6% offset between members
                  const position = Math.max(0, Math.min(memberProgress - 8 + horizontalOffset, 92));
                  
                  const penguinSize = index === 1 ? '79px' : '83px';
                  
                  return (
                    <div
                      key={member.id}
                      className="absolute"
                      style={{
                        left: `${position}%`,
                        top: index === 1 ? '8px' : '0px', // Slight vertical offset for second member
                        transition: 'left 500ms ease-out, top 500ms ease-out'
                      }}
                    >
                      <img 
                        src={tigoPenguin} 
                        alt={`Tigo de ${member.name}`}
                        className="object-contain drop-shadow-lg"
                        style={{
                          width: penguinSize,
                          height: penguinSize,
                          minWidth: penguinSize,
                          minHeight: penguinSize,
                          maxWidth: penguinSize,
                          maxHeight: penguinSize
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
