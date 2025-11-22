import { Card } from "@/components/ui/card";
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
  // Calculate progress percentage
  const progress = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
  const isFullyCompleted = progress === 100 && totalActivities > 0;
  
  // SVG circle calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 flex-1 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-2xl p-2 ${
        isToday ? 'bg-primary/5 ring-2 ring-primary/30' : ''
      }`}
      aria-label={`${day} ${date}, ${completedActivities} of ${totalActivities} activities completed`}
    >
      {/* Weekday label */}
      <span className={`text-xs font-medium ${
        isToday ? 'text-primary font-semibold' : 'text-muted-foreground'
      }`}>
        {day}
      </span>
      
      {/* Circular progress ring with date */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90" 
          viewBox="0 0 48 48"
        >
          {/* Background ring */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            className={`${
              totalActivities === 0 
                ? 'stroke-gray-200' 
                : 'stroke-purple-100'
            }`}
            strokeWidth="3"
          />
          
          {/* Progress ring */}
          {totalActivities > 0 && (
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              className={`${
                isFullyCompleted 
                  ? 'stroke-purple-400' 
                  : 'stroke-purple-300'
              } transition-all duration-500 ease-out`}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          )}
        </svg>
        
        {/* Date number in center */}
        <span className={`text-lg font-bold relative z-10 ${
          isToday 
            ? 'text-primary' 
            : totalActivities === 0 
              ? 'text-gray-400' 
              : 'text-gray-700'
        }`}>
          {date}
        </span>
        
        {/* Completion star accent */}
        {isFullyCompleted && (
          <Star 
            className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 fill-purple-400 animate-in zoom-in duration-300" 
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
};

export const WeeklyCalendar = ({ weekData, onDayClick }: WeeklyCalendarProps) => {
  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-4">Esta semana</h3>
      <div className="flex justify-between gap-1">
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
