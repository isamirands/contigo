import { useState, useRef, useEffect } from "react";
import { LucideIcon, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Soft pastel color palette for calm, peaceful UI
const PASTEL_COLORS = [
  { base: '#FDE2E4', fill: '#FBB6BC', name: 'soft pink' },      // Soft pink
  { base: '#E2F0CB', fill: '#C5E1A5', name: 'light green' },    // Light green
  { base: '#F9F1D9', fill: '#F0E4B3', name: 'light cream' },    // Light cream/yellow
  { base: '#E0F4FF', fill: '#B3E0FF', name: 'soft blue' },      // Soft blue
  { base: '#F3E8FF', fill: '#D9C2F0', name: 'soft lavender' },  // Soft lavender
  { base: '#FFE7D6', fill: '#FFCBA4', name: 'peach' },          // Peach
  { base: '#E4F5EA', fill: '#B8E6CA', name: 'mint' },           // Mint
];

interface ActivitySliderCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  completed: boolean;
  onComplete: (id: string) => void;
  owners?: Array<{ name: string; avatar?: string }>;
  colorIndex?: number;
}

export const ActivitySliderCard = ({ 
  id, 
  icon: Icon, 
  title, 
  completed, 
  onComplete,
  owners,
  colorIndex = 0
}: ActivitySliderCardProps) => {
  const [progress, setProgress] = useState(completed ? 100 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);

  // Get color from palette
  const colorScheme = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];

  useEffect(() => {
    if (completed) {
      setProgress(100);
    }
  }, [completed]);

  const handleStart = (clientX: number) => {
    if (completed) return;
    setIsDragging(true);
    startXRef.current = clientX;
    startProgressRef.current = progress;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || completed || !cardRef.current) return;
    
    const cardWidth = cardRef.current.offsetWidth;
    const deltaX = clientX - startXRef.current;
    const deltaProgress = (deltaX / cardWidth) * 100;
    const newProgress = Math.max(0, Math.min(100, startProgressRef.current + deltaProgress));
    
    setProgress(newProgress);
  };

  const handleEnd = () => {
    if (!isDragging || completed) return;
    setIsDragging(false);
    
    if (progress >= 90) {
      setProgress(100);
      onComplete(id);
    } else if (progress < 90) {
      setProgress(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => handleEnd();
    const handleGlobalTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, progress, completed]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${
        completed ? 'shadow-md' : 'shadow-sm hover:shadow-md'
      } ${!completed && 'cursor-grab active:cursor-grabbing'}`}
      style={{
        height: '100px',
        userSelect: 'none',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Progress fill - slightly stronger shade of the pastel color */}
      <div
        className="absolute inset-0 transition-all duration-200"
        style={{
          backgroundColor: completed ? '#86EFAC' : colorScheme.fill,
          width: `${progress}%`,
          transition: isDragging ? 'none' : 'width 0.3s ease-out'
        }}
      />

      {/* Base background - soft pastel */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: completed ? '#D1FAE5' : colorScheme.base,
          zIndex: -1 
        }} 
      />

      {/* Content */}
      <div className="relative h-full px-5 py-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Icon 
              className="h-7 w-7 flex-shrink-0 text-slate-700 transition-opacity" 
              style={{ opacity: progress > 70 ? 0.9 : 1 }}
            />
            <h3 
              className="text-lg font-semibold text-slate-800"
              style={{ opacity: progress > 70 ? 0.95 : 1 }}
            >
              {title}
            </h3>
          </div>
          
          {completed && (
            <div className="bg-white rounded-full p-1.5 shadow-sm">
              <Check className="h-5 w-5 text-emerald-600" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Owner avatars */}
          {owners && owners.length > 0 && (
            <div className="flex gap-1">
              {owners.map((owner, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white shadow-sm">
                  <AvatarImage src={owner.avatar} />
                  <AvatarFallback className="text-xs bg-white text-slate-700 font-medium">
                    {owner.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}

          {/* Progress hint */}
          {!completed && progress < 90 && (
            <span className="text-sm font-medium text-slate-600">
              Desliza →
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
