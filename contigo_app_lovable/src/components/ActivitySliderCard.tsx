import { useState, useRef, useEffect } from "react";
import { LucideIcon, Check, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Soft pastel color palette for calm, peaceful UI
const PASTEL_COLORS = [
  { base: '#FDE2E4', fill: '#FBB6BC', completed: '#F9A8B0', name: 'soft pink' },      // Soft pink
  { base: '#E2F0CB', fill: '#C5E1A5', completed: '#B8D98E', name: 'light green' },    // Light green
  { base: '#F9F1D9', fill: '#F0E4B3', completed: '#E8D89C', name: 'light cream' },    // Light cream/yellow
  { base: '#E0F4FF', fill: '#B3E0FF', completed: '#99D6FF', name: 'soft blue' },      // Soft blue
  { base: '#F3E8FF', fill: '#D9C2F0', completed: '#C9AEE8', name: 'soft lavender' },  // Soft lavender
  { base: '#FFE7D6', fill: '#FFCBA4', completed: '#FFB88A', name: 'peach' },          // Peach
  { base: '#E4F5EA', fill: '#B8E6CA', completed: '#A0DDBB', name: 'mint' },           // Mint
];

interface ActivitySliderCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  completed: boolean;
  onComplete: (id: string) => void;
  onEducationalClick?: () => void;
  onReminder?: (id: string, title: string) => void;
  owners?: Array<{ name: string; avatar?: string }>;
  colorIndex?: number;
}

export const ActivitySliderCard = ({ 
  id, 
  icon: Icon, 
  title, 
  completed, 
  onComplete,
  onEducationalClick,
  onReminder,
  owners,
  colorIndex = 0
}: ActivitySliderCardProps) => {
  const [progress, setProgress] = useState(completed ? 100 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  const isHorizontalGestureRef = useRef(false);

  // Get color from palette
  const colorScheme = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];
  
  // Check if this is the educational habit
  const isEducationalHabit = title === "Leer artículo educativo: Hipoglucemia e hiperglucemia";

  useEffect(() => {
    if (completed) {
      setProgress(100);
    }
  }, [completed]);

  const handleStart = (clientX: number, clientY: number) => {
    if (completed) return;
    
    // For educational habit, don't do anything on tap/click
    // Only slide gesture will open the modal
    if (isEducationalHabit) {
      // Start tracking for slide gesture
      startXRef.current = clientX;
      startYRef.current = clientY;
      startProgressRef.current = 0; // Always start from 0 for educational habit
      isHorizontalGestureRef.current = false;
      setIsDragging(true);
      return;
    }
    
    startXRef.current = clientX;
    startYRef.current = clientY;
    startProgressRef.current = progress;
    isHorizontalGestureRef.current = false;
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || completed || !cardRef.current) return;
    
    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;
    
    // Determine gesture direction on first significant movement
    if (!isHorizontalGestureRef.current && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      // If movement is more vertical than horizontal, allow scrolling
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        setIsDragging(false);
        return;
      }
      // Gesture is horizontal
      isHorizontalGestureRef.current = true;
    }
    
    // Only update progress if gesture is horizontal
    if (isHorizontalGestureRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const deltaProgress = (deltaX / cardWidth) * 100;
      
      // For educational habit, show visual feedback but don't complete
      if (isEducationalHabit) {
        const newProgress = Math.max(0, Math.min(50, deltaProgress)); // Max 50% to show it won't complete
        setProgress(newProgress);
      } else {
        const newProgress = Math.max(0, Math.min(100, startProgressRef.current + deltaProgress));
        setProgress(newProgress);
      }
    }
  };

  const handleEnd = () => {
    if (!isDragging || completed) return;
    setIsDragging(false);
    
    // For educational habit: slide opens modal, never completes
    if (isEducationalHabit) {
      if (progress > 20 && onEducationalClick) {
        // Slide detected, open modal
        onEducationalClick();
      }
      // Always reset progress for educational habit
      setProgress(0);
      return;
    }
    
    // For other habits: normal slide-to-complete behavior
    if (progress >= 90) {
      setProgress(100);
      onComplete(id);
    } else if (progress < 90) {
      setProgress(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
    // Only prevent default if gesture is horizontal
    if (isHorizontalGestureRef.current) {
      e.preventDefault();
    }
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
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
        completed ? 'shadow-md' : 'shadow-sm hover:shadow-md'
      } ${!completed && (isEducationalHabit ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing')}`}
      style={{
        height: '70px',
        userSelect: 'none',
        touchAction: 'pan-y' // Allow vertical panning (scrolling)
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
          backgroundColor: completed ? colorScheme.completed : colorScheme.fill,
          width: `${progress}%`,
          transition: isDragging ? 'none' : 'width 0.3s ease-out'
        }}
      />

      {/* Base background - soft pastel */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: colorScheme.base,
          zIndex: -1 
        }} 
      />

      {/* Content */}
      <div className="relative h-full px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Icon 
            className="h-5 w-5 flex-shrink-0 text-slate-700 transition-opacity" 
            style={{ opacity: progress > 70 ? 0.9 : 1 }}
          />
          <h3 
            className="text-sm font-semibold text-slate-800 truncate"
            style={{ opacity: progress > 70 ? 0.95 : 1 }}
          >
            {title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Owner avatars */}
          {owners && owners.length > 0 && (
            <div className="flex gap-0.5">
              {owners.map((owner, index) => (
                <Avatar key={index} className="w-6 h-6 border border-white shadow-sm">
                  <AvatarImage src={owner.avatar} />
                  <AvatarFallback className="text-[10px] bg-white text-slate-700 font-medium">
                    {owner.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
          
          {/* Reminder button */}
          {!completed && onReminder && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReminder(id, title);
              }}
              className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
              aria-label="Recordatorio"
            >
              <Bell className="h-4 w-4 text-blue-600" />
            </button>
          )}
          
          {completed && (
            <div className="bg-white rounded-full p-1 shadow-sm">
              <Check className="h-4 w-4 text-slate-700" />
            </div>
          )}
          
          {/* Progress hint */}
          {!completed && progress < 90 && !onReminder && (
            <span className="text-xs font-medium text-slate-600">
              →
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
