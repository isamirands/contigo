import { Card } from "@/frontend/components/ui/card";
import { Star } from "lucide-react";

interface DayData {
  day: string;
  date: number;
  totalActivities: number;
  completedActivities: number;
  isToday: boolean;
}

interface WeeklyCalendarProps {
  weekData: DayData[];
  onDayClick?: (date: number) => void;
}

interface DayComponentProps {
  day: string;
  date: number;
  totalActivities: number;
  completedActivities: number;
  isToday: boolean;
  onClick?: () => void;
}

const DayComponent = ({ 
  day, 
  date, 
  totalActivities, 
  completedActivities, 
  isToday,
  onClick 
}: DayComponentProps) => {
  // RIMAC brand colors
  const RIMAC_RED = '#E31E24';
  const RIMAC_RED_LIGHT = '#FECDD0'; // Very light pastel red tint for base ring
  
  // Calculate progress percentage
  const progress = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
  const isFullyCompleted = progress === 100 && totalActivities > 0;
  
  // SVG circle calculations - smaller radius for mobile
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 flex-1 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 rounded-xl p-1 min-w-0 ${
        isToday ? 'bg-red-50/50 ring-1 ring-red-200/60' : ''
      }`}
      style={{
        ...(isToday && { 
          '--tw-ring-color': 'rgba(254, 205, 208, 0.6)' 
        }),
        minHeight: '44px', // Ensure minimum touch target
      } as React.CSSProperties}
      aria-label={`${day} ${date}, ${completedActivities} of ${totalActivities} activities completed`}
    >
      {/* Weekday label */}
      <span 
        className={`text-[10px] font-medium leading-none ${
          isToday ? 'font-semibold' : ''
        }`}
        style={{
          color: isToday ? RIMAC_RED : '#6B7280' // gray-500
        }}
      >
        {day}
      </span>
      
      {/* Circular progress ring with date */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90" 
          viewBox="0 0 32 32"
        >
          {/* Background ring - light RIMAC red tint or gray */}
          <circle
            cx="16"
            cy="16"
            r={radius}
            fill="none"
            stroke={totalActivities === 0 ? '#E5E7EB' : RIMAC_RED_LIGHT}
            strokeWidth="2"
          />
          
          {/* Progress ring - main RIMAC red */}
          {totalActivities > 0 && (
            <circle
              cx="16"
              cy="16"
              r={radius}
              fill="none"
              stroke={RIMAC_RED}
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
              style={{
                filter: isFullyCompleted ? 'drop-shadow(0 0 2px rgba(227, 30, 36, 0.4))' : 'none'
              }}
            />
          )}
        </svg>
        
        {/* Date number in center */}
        <span 
          className={`text-sm font-bold relative z-10 leading-none`}
          style={{
            color: isToday 
              ? RIMAC_RED 
              : totalActivities === 0 
                ? '#9CA3AF' // gray-400
                : '#374151' // gray-700
          }}
        >
          {date}
        </span>
        
        {/* Completion star accent */}
        {isFullyCompleted && (
          <Star 
            className="absolute -top-0.5 -right-0.5 w-3 h-3 animate-in zoom-in duration-300" 
            style={{
              color: RIMAC_RED,
              fill: RIMAC_RED
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
};

export const WeeklyCalendar = ({ weekData, onDayClick }: WeeklyCalendarProps) => {
  return (
    <Card className="px-3 py-2">
      <h3 className="text-base font-semibold mb-1.5">Esta semana</h3>
      <div className="flex justify-between gap-0.5">
        {weekData.map((dayData, index) => (
          <DayComponent
            key={index}
            day={dayData.day}
            date={dayData.date}
            totalActivities={dayData.totalActivities}
            completedActivities={dayData.completedActivities}
            isToday={dayData.isToday}
            onClick={() => onDayClick?.(dayData.date)}
          />
        ))}
      </div>
    </Card>
  );
};
