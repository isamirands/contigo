import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Settings, ChevronDown, TrendingUp, Award, CheckCircle, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const HABITS = [
  { id: "general", name: "General" },
  { id: "water", name: "Beber agua" },
  { id: "exercise", name: "Caminar" },
  { id: "medication", name: "Medicación" },
];

const Metrics = () => {
  const navigate = useNavigate();
  const [selectedHabit, setSelectedHabit] = useState("general");

  // Mock data - in real app, this would come from actual activity completion data
  const todayProgress = 40; // 2 out of 5 activities completed (matches Home)
  const currentStreak = 7;
  const perfectDays = 12;
  const habitsCompleted = 156;
  const dailyAverage = 4.2;

  // Generate calendar days (current month)
  const daysInMonth = 30;
  const today = 22;
  
  // Mock completion data for each day (0-100%)
  const dayCompletions = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    if (day > today) return null; // Future days
    if (day === today) return todayProgress; // Today matches Home
    // Past days - mock data
    return Math.floor(Math.random() * 100);
  });

  const getDayColor = (completion: number | null) => {
    if (completion === null) return "bg-gray-100 text-gray-400";
    if (completion === 100) return "bg-green-500 text-white";
    if (completion >= 75) return "bg-green-300 text-gray-800";
    if (completion >= 50) return "bg-yellow-300 text-gray-800";
    if (completion >= 25) return "bg-orange-300 text-gray-800";
    return "bg-red-200 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-10" /> {/* Spacer */}
          <h1 className="text-xl font-bold">Métricas</h1>
          <button
            onClick={() => navigate("/settings")}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Ajustes"
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Habit Selector */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Vista:</span>
          <Select value={selectedHabit} onValueChange={setSelectedHabit}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HABITS.map((habit) => (
                <SelectItem key={habit.id} value={habit.id}>
                  {habit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Monthly Calendar */}
        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-3 text-center">Diciembre 2024</h2>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const completion = dayCompletions[i];
              const isToday = day === today;
              
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    getDayColor(completion)
                  } ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>100%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-300" />
              <span>50-75%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-200" />
              <span>&lt;25%</span>
            </div>
          </div>
        </Card>

        {/* Central Progress Circle */}
        <div className="flex flex-col items-center py-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#10b981"
                strokeWidth="12"
                strokeDasharray={`${(todayProgress / 100) * 534.07} 534.07`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-primary">{todayProgress}%</span>
              <span className="text-sm text-muted-foreground mt-1">Progreso de hoy</span>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Streak */}
          <Card className="p-4 flex flex-col items-center text-center">
            <TrendingUp className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-2xl font-bold">{currentStreak}</span>
            <span className="text-xs text-muted-foreground mt-1">Días consecutivos</span>
          </Card>

          {/* Perfect Days */}
          <Card className="p-4 flex flex-col items-center text-center">
            <Award className="h-6 w-6 text-yellow-500 mb-2" />
            <span className="text-2xl font-bold">{perfectDays}</span>
            <span className="text-xs text-muted-foreground mt-1">Días perfectos</span>
          </Card>

          {/* Habits Completed */}
          <Card className="p-4 flex flex-col items-center text-center">
            <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
            <span className="text-2xl font-bold">{habitsCompleted}</span>
            <span className="text-xs text-muted-foreground mt-1">Hábitos hechos</span>
          </Card>

          {/* Daily Average */}
          <Card className="p-4 flex flex-col items-center text-center">
            <BarChart3 className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{dailyAverage}</span>
            <span className="text-xs text-muted-foreground mt-1">Promedio diario</span>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Metrics;
