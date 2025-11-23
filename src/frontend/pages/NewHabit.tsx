import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Heart, Lock } from "lucide-react";
import { Card } from "@/frontend/components/ui/card";
import { toast } from "sonner";

// Categories
const CATEGORIES = [
  { id: "hot", name: "Tendencias", emoji: "🔥" },
  { id: "nutricion", name: "Nutrición", emoji: "🥗" },
  { id: "ejercicio", name: "Ejercicio", emoji: "🏃" },
  { id: "agua", name: "Agua", emoji: "💧" },
  { id: "medicacion", name: "Medicación", emoji: "💊" },
  { id: "aprendizaje", name: "Aprendizaje", emoji: "📚" },
  { id: "monitoreo", name: "Monitoreo", emoji: "📊" },
];

// Habit type with level and short display name
type HabitItem = {
  id: string;
  displayName: string; // SHORT: max 3 words
  fullName: string; // Full description (for tooltips/details)
  emoji: string;
  level: 1 | 2 | 3;
};

// All habits data - MAX 10 per category enforced below
const HABITS_DATA: Record<string, HabitItem[]> = {
  hot: [
    { id: "h1", displayName: "Agua", fullName: "Tomar agua al despertar", emoji: "💧", level: 1 },
    { id: "h2", displayName: "Caminar", fullName: "Caminar 5 minutos", emoji: "🚶", level: 1 },
    { id: "h3", displayName: "Verduras", fullName: "Agregar verduras", emoji: "🥬", level: 1 },
    { id: "h4", displayName: "Medicación", fullName: "Tomar medicación", emoji: "✅", level: 1 },
    { id: "h5", displayName: "Plato balanceado", fullName: "Plato balanceado", emoji: "🍽️", level: 2 },
    { id: "h6", displayName: "Glucosa", fullName: "Registrar glucosa", emoji: "🩸", level: 2 },
    { id: "h7", displayName: "Sin azúcar", fullName: "Día sin azúcar", emoji: "🚫", level: 2 },
    { id: "h8", displayName: "Ejercicio 30min", fullName: "Ejercicio 30 minutos", emoji: "🏃‍♀️", level: 3 },
    { id: "h9", displayName: "Plato peruano", fullName: "Plato peruano saludable", emoji: "🇵🇪", level: 3 },
    { id: "h10", displayName: "Reporte semanal", fullName: "Revisar reporte semanal", emoji: "📊", level: 3 },
  ],
  nutricion: [
    { id: "n1", displayName: "Menos azúcar", fullName: "Reducir azúcar", emoji: "🍬", level: 1 },
    { id: "n2", displayName: "Agua", fullName: "Cambiar bebida por agua", emoji: "🥤", level: 1 },
    { id: "n3", displayName: "Verduras", fullName: "Agregar verduras", emoji: "🥬", level: 1 },
    { id: "n4", displayName: "Fruta entera", fullName: "Comer fruta entera", emoji: "🍎", level: 1 },
    { id: "n5", displayName: "Pan integral", fullName: "Usar pan integral", emoji: "🍞", level: 1 },
    { id: "n6", displayName: "Plato balanceado", fullName: "Plato balanceado", emoji: "🍽️", level: 2 },
    { id: "n7", displayName: "Stevia", fullName: "Usar stevia", emoji: "🌿", level: 2 },
    { id: "n8", displayName: "Snack saludable", fullName: "Snack saludable", emoji: "🥜", level: 2 },
    { id: "n9", displayName: "Plato peruano", fullName: "Plato peruano saludable", emoji: "🇵🇪", level: 3 },
    { id: "n10", displayName: "Lista compras", fullName: "Lista de compras", emoji: "🛒", level: 3 },
  ],
  ejercicio: [
    { id: "e1", displayName: "Caminar", fullName: "Caminar 5 minutos", emoji: "🚶", level: 1 },
    { id: "e2", displayName: "Estiramientos", fullName: "Estiramientos", emoji: "🤸", level: 1 },
    { id: "e3", displayName: "Zapatillas", fullName: "Ponerme zapatillas", emoji: "👟", level: 1 },
    { id: "e4", displayName: "Caminar 10min", fullName: "Caminar 10 minutos", emoji: "🚶‍♂️", level: 2 },
    { id: "e5", displayName: "500 pasos", fullName: "Aumentar 500 pasos", emoji: "📈", level: 2 },
    { id: "e6", displayName: "Movilidad", fullName: "Movilidad 5 minutos", emoji: "🧘‍♀️", level: 2 },
    { id: "e7", displayName: "Ejercicio 30min", fullName: "Ejercicio 30 minutos", emoji: "🏃‍♀️", level: 3 },
    { id: "e8", displayName: "Banda elástica", fullName: "Ejercicios con banda", emoji: "💪", level: 3 },
    { id: "e9", displayName: "Glucosa ejercicio", fullName: "Medir glucosa ejercicio", emoji: "📊", level: 3 },
  ],
  agua: [
    { id: "a1", displayName: "Botella cama", fullName: "Botella junto a cama", emoji: "🛏️", level: 1 },
    { id: "a2", displayName: "Agua mañana", fullName: "Agua al despertar", emoji: "💧", level: 1 },
    { id: "a3", displayName: "Llenar tomatodo", fullName: "Llenar tomatodo", emoji: "🚰", level: 1 },
    { id: "a4", displayName: "1 tomatodo", fullName: "Beber 1 tomatodo", emoji: "🥤", level: 2 },
    { id: "a5", displayName: "Registrar agua", fullName: "Registrar agua", emoji: "📝", level: 2 },
    { id: "a6", displayName: "3 tomatodos", fullName: "Llenar 3 veces", emoji: "💦", level: 3 },
    { id: "a7", displayName: "Agua comidas", fullName: "Agua antes comidas", emoji: "🥛", level: 3 },
  ],
  medicacion: [
    { id: "m1", displayName: "Ingresar meds", fullName: "Ingresar medicamentos", emoji: "💊", level: 1 },
    { id: "m2", displayName: "Recordatorio", fullName: "Configurar recordatorio", emoji: "🔔", level: 1 },
    { id: "m3", displayName: "Tomé medicación", fullName: "Confirmar medicación", emoji: "✅", level: 1 },
    { id: "m4", displayName: "Olvido", fullName: "Registrar olvido", emoji: "⚠️", level: 1 },
    { id: "m5", displayName: "Alerta", fullName: "Recibir alerta", emoji: "📢", level: 2 },
    { id: "m6", displayName: "Compré reposición", fullName: "Confirmar reposición", emoji: "🛍️", level: 3 },
    { id: "m7", displayName: "Informe adherencia", fullName: "Revisar informe", emoji: "📊", level: 3 },
    { id: "m8", displayName: "Efectos", fullName: "Registrar efectos", emoji: "📋", level: 3 },
  ],
  aprendizaje: [
    { id: "ap1", displayName: "Medir glucosa", fullName: "Lección: Medir glucosa", emoji: "🎓", level: 1 },
    { id: "ap2", displayName: "Mitos", fullName: "Lección: Mitos diabetes", emoji: "💡", level: 1 },
    { id: "ap3", displayName: "Stevia", fullName: "Lección: Elegir stevia", emoji: "🌿", level: 1 },
    { id: "ap4", displayName: "Etiquetas", fullName: "Revisar etiquetas", emoji: "🔍", level: 1 },
    { id: "ap5", displayName: "Comidas peruanas", fullName: "Guía: Comidas peruanas", emoji: "🇵🇪", level: 2 },
    { id: "ap6", displayName: "Azúcar oculta", fullName: "Detectar azúcar oculta", emoji: "🏷️", level: 2 },
    { id: "ap7", displayName: "Plato balanceado", fullName: "Lección: Plato balanceado", emoji: "🍽️", level: 2 },
    { id: "ap8", displayName: "Índice glucémico", fullName: "Lección: Índice glucémico", emoji: "📈", level: 3 },
    { id: "ap9", displayName: "Antojos", fullName: "Lección: Manejo antojos", emoji: "🧠", level: 3 },
    { id: "ap10", displayName: "Glucosa alta/baja", fullName: "Lección: Glucosa alta/baja", emoji: "⚕️", level: 3 },
  ],
  monitoreo: [
    { id: "mo1", displayName: "Glucosa ayunas", fullName: "Registrar glucosa ayunas", emoji: "🩸", level: 1 },
    { id: "mo2", displayName: "Presión", fullName: "Registrar presión", emoji: "💓", level: 1 },
    { id: "mo3", displayName: "Síntoma", fullName: "Registrar síntoma", emoji: "📝", level: 1 },
    { id: "mo4", displayName: "Glucosa comida", fullName: "Glucosa después comida", emoji: "🍽️", level: 2 },
    { id: "mo5", displayName: "Glucosa ejercicio", fullName: "Glucosa y ejercicio", emoji: "🏃", level: 2 },
    { id: "mo6", displayName: "Reporte semanal", fullName: "Revisar reporte semanal", emoji: "📊", level: 3 },
    { id: "mo7", displayName: "Comida alta", fullName: "Registrar comida alta", emoji: "📋", level: 3 },
    { id: "mo8", displayName: "Recomendación", fullName: "Aceptar recomendación", emoji: "✨", level: 3 },
  ],
};

const NewHabit = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("hot");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Mock unlock condition - TODO: Replace with real user progress
  const completedJourneys = 5; // Mock value
  const isLevel3Unlocked = completedJourneys >= 10;

  const handleAddHabit = (habit: HabitItem, isLocked: boolean) => {
    if (isLocked) {
      toast.info("Hábito bloqueado", {
        description: "Completa más viajes para desbloquear",
      });
      return;
    }

    toast.success("Hábito añadido", {
      description: habit.displayName,
    });
  };

  const toggleFavorite = (habitId: string, isLocked: boolean) => {
    if (isLocked) return;

    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(habitId)) {
        newFavorites.delete(habitId);
      } else {
        newFavorites.add(habitId);
      }
      return newFavorites;
    });
  };

  // Get habits for selected category - MAX 10
  const allHabits = HABITS_DATA[selectedCategory] || [];
  const visibleHabits = allHabits.slice(0, 10);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold">Nuevo hábito</h1>
              <p className="text-xs text-muted-foreground">Elige hábitos para añadir</p>
            </div>
            <div className="w-9" />
          </div>
        </div>
      </header>

      {/* Category Selector */}
      <div className="bg-card border-b border-border sticky top-[65px] z-30">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide justify-start">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all ${
                  selectedCategory === category.id ? "" : "opacity-50"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary/15 ring-2 ring-primary shadow-sm"
                      : "bg-secondary/50"
                  }`}
                >
                  {category.emoji}
                </div>
                <span className="text-[11px] font-medium whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Habits List */}
      <main className="max-w-2xl mx-auto px-4 py-4 pb-24">
        <div className="space-y-2">
          {visibleHabits.map((habit) => {
            const isLocked = habit.level === 3 && !isLevel3Unlocked;

            return (
              <Card
                key={habit.id}
                className={`p-2.5 flex items-center gap-2.5 transition-all ${
                  isLocked
                    ? "bg-muted/30 opacity-60"
                    : "hover:shadow-md"
                }`}
              >
                <span className="text-xl flex-shrink-0 w-8 text-center">
                  {habit.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium ${isLocked ? "text-muted-foreground" : ""}`}>
                    {habit.displayName}
                  </span>
                  {isLocked && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        Por desbloquear
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0 items-center">
                  <button
                    onClick={() => toggleFavorite(habit.id, isLocked)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isLocked
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-secondary"
                    }`}
                    aria-label="Favorito"
                    disabled={isLocked}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.has(habit.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleAddHabit(habit, isLocked)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isLocked
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    aria-label="Añadir hábito"
                  >
                    {isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Level 3 unlock hint */}
        {!isLevel3Unlocked && visibleHabits.some((h) => h.level === 3) && (
          <div className="mt-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 Completa {10 - completedJourneys} viajes más para desbloquear hábitos avanzados
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewHabit;
