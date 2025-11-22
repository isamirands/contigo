import { Card } from "@/components/ui/card";

interface DayData {
  day: string;
  date: number;
  steps: number;
  progress: number; // 0-100
  isToday: boolean;
}

interface WeeklyCalendarProps {
  weekData: DayData[];
}

export const WeeklyCalendar = ({ weekData }: WeeklyCalendarProps) => {
  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-4">Esta semana</h3>
      <div className="flex justify-between gap-2">
        {weekData.map((day, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center gap-2 flex-1 ${
              day.isToday ? 'scale-110' : ''
            }`}
          >
            <div 
              className={`rounded-full w-14 h-14 flex flex-col items-center justify-center transition-all ${
                day.isToday 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'bg-muted'
              }`}
            >
              <span className="text-xs font-medium">{day.day}</span>
              <span className="text-lg font-bold">{day.date}</span>
            </div>
            
            {/* Progress ring */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeDasharray={`${day.progress * 100.48 / 100} 100.48`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold">{day.steps}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
