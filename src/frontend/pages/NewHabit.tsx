import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Plus } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Card } from "@/frontend/components/ui/card";
import { toast } from "sonner";

// Categories
const CATEGORIES = [
  { id: "nutricion", name: "Nutrición", emoji: "🥗" },
  { id: "ejercicio", name: "Ejercicio", emoji: "🏃" },
  { id: "agua", name: "Agua", emoji: "💧" },
  { id: "medicacion", name: "Medicación", emoji: "💊" },
  { id: "aprendizaje", name: "Aprendizaje", emoji: "📚" },
  { id: "monitoreo", name: "Monitoreo", emoji: "📊" },
];

// Habits data structure
const HABITS_DATA = {
  nutricion: {
    nivel1: [
      { id: "n1-1", name: "Reducir ½ cucharadita de azúcar en una bebida", emoji: "🍬" },
      { id: "n1-2", name: "Cambiar una bebida azucarada por agua", emoji: "🥤" },
      { id: "n1-3", name: "Identificar la principal fuente de carbohidratos en mi almuerzo", emoji: "🍚" },
      { id: "n1-4", name: "Agregar una porción de verduras a mi plato", emoji: "🥬" },
      { id: "n1-5", name: "Cambiar jugo por fruta entera", emoji: "🍎" },
      { id: "n1-6", name: "Usar pan integral en una comida", emoji: "🍞" },
      { id: "n1-7", name: "Comer 1 comida sin celular", emoji: "📵" },
      { id: "n1-8", name: "Añadir una fruta entera al desayuno", emoji: "🍌" },
      { id: "n1-9", name: "Comer dentro de las primeras 2 horas después de despertar", emoji: "⏰" },
      { id: "n1-10", name: "Planear qué almorzaré mañana", emoji: "📝" },
    ],
    nivel2: [
      { id: "n2-1", name: "Usar stevia adecuada (sin rellenos) en una bebida", emoji: "🌿" },
      { id: "n2-2", name: "Pasar un día sin bebidas azucaradas", emoji: "🚫" },
      { id: "n2-3", name: "Registrar cuántas cucharadas de arroz serví", emoji: "🥄" },
      { id: "n2-4", name: "Cambiar arroz blanco por integral/quinua", emoji: "🌾" },
      { id: "n2-5", name: "Hacer un plato ½ verduras, ¼ proteína, ¼ carbo", emoji: "🍽️" },
      { id: "n2-6", name: "Combinar 2 colores de verduras en una comida", emoji: "🥕" },
      { id: "n2-7", name: "Cambiar un snack procesado por frutos secos o yogur sin azúcar", emoji: "🥜" },
      { id: "n2-8", name: "Tomar 3 respiraciones antes de comer un antojo", emoji: "🧘" },
      { id: "n2-9", name: "Agregar semillas (chia/linaza) a una comida", emoji: "🌱" },
      { id: "n2-10", name: "Comer más lento durante 10 minutos", emoji: "🐌" },
      { id: "n2-11", name: "Preparar una comida saludable por adelantado", emoji: "🥡" },
    ],
    nivel3: [
      { id: "n3-1", name: "Reducir azúcar al 50% hoy", emoji: "📉" },
      { id: "n3-2", name: "Evitar completamente bebidas azucaradas hoy", emoji: "🛑" },
      { id: "n3-3", name: "Registrar cómo me siento 2 horas después de comer carbohidratos", emoji: "📋" },
      { id: "n3-4", name: "Preparar un plato peruano versión amigable para diabéticos", emoji: "🇵🇪" },
      { id: "n3-5", name: "Reemplazar mantequilla por palta en una comida", emoji: "🥑" },
      { id: "n3-6", name: "Describir si un antojo fue emocional o físico", emoji: "💭" },
      { id: "n3-7", name: "Comer una ensalada pequeña antes de la comida principal", emoji: "🥗" },
      { id: "n3-8", name: "Elegir un snack con menos de 5 ingredientes", emoji: "🏷️" },
      { id: "n3-9", name: "Hacer lista de compras saludable para 3 días", emoji: "🛒" },
    ],
  },
  ejercicio: {
    nivel1: [
      { id: "e1-1", name: "Caminar 2–5 minutos después de una comida", emoji: "🚶" },
      { id: "e1-2", name: "Hacer 1 minuto de estiramientos al despertar", emoji: "🤸" },
      { id: "e1-3", name: "Ponerme las zapatillas", emoji: "👟" },
    ],
    nivel2: [
      { id: "e2-1", name: "Caminar 10 minutos hoy", emoji: "🚶‍♂️" },
      { id: "e2-2", name: "Aumentar 500 pasos respecto a ayer", emoji: "📈" },
      { id: "e2-3", name: "Hacer 3–5 minutos de movilidad", emoji: "🧘‍♀️" },
    ],
    nivel3: [
      { id: "e3-1", name: "Caminar o ejercitarme 20–30 minutos", emoji: "🏃‍♀️" },
      { id: "e3-2", name: "Hacer ejercicios con banda elástica", emoji: "💪" },
      { id: "e3-3", name: "Medir glucosa antes y después del ejercicio", emoji: "📊" },
    ],
  },
  agua: {
    nivel1: [
      { id: "a1-1", name: "Colocar botella de agua junto a la cama", emoji: "🛏️" },
      { id: "a1-2", name: "Tomar un sorbo al despertar", emoji: "💧" },
      { id: "a1-3", name: "Llenar el tomatodo en la mañana", emoji: "🚰" },
    ],
    nivel2: [
      { id: "a2-1", name: "Beber 1 tomatodo completo en la mañana", emoji: "🥤" },
      { id: "a2-2", name: "Registrar cuánta agua tomé hoy", emoji: "📝" },
    ],
    nivel3: [
      { id: "a3-1", name: "Llenar mi tomatodo 3 veces hoy", emoji: "💦" },
      { id: "a3-2", name: "Tomar un vaso de agua antes de cada comida", emoji: "🥛" },
    ],
  },
  medicacion: {
    nivel1: [
      { id: "m1-1", name: "Confirmar/ingresar mis medicamentos", emoji: "💊" },
      { id: "m1-2", name: "Elegir cuántos días antes quiero recordatorio de reposición", emoji: "🔔" },
      { id: "m1-3", name: "Confirmar 'Tomé mi medicación' hoy", emoji: "✅" },
      { id: "m1-4", name: "Registrar si olvidé alguna toma", emoji: "⚠️" },
    ],
    nivel2: [
      { id: "m2-1", name: "Marcar 'Recibí alerta de que quedan pocos días de medicación'", emoji: "📢" },
    ],
    nivel3: [
      { id: "m3-1", name: "Confirmar 'Ya compré mi reposición de medicación'", emoji: "🛍️" },
      { id: "m3-2", name: "Revisar mi informe semanal de adherencia", emoji: "📊" },
      { id: "m3-3", name: "Registrar si tuve efectos secundarios", emoji: "📋" },
    ],
  },
  aprendizaje: {
    nivel1: [
      { id: "ap1-1", name: "Ver microlección: 'Cómo medir mi glucosa'", emoji: "🎓" },
      { id: "ap1-2", name: "Ver microlección: 'Mitos sobre la diabetes'", emoji: "💡" },
      { id: "ap1-3", name: "Ver microlección: 'Cómo elegir la stevia correcta'", emoji: "🌿" },
      { id: "ap1-4", name: "Revisar etiqueta de stevia para verificar que no tiene azúcar añadida", emoji: "🔍" },
    ],
    nivel2: [
      { id: "ap2-1", name: "Ver guía: 'Comidas peruanas compatibles con diabetes'", emoji: "🇵🇪" },
      { id: "ap2-2", name: "Leer 3 etiquetas y detectar azúcar oculta", emoji: "🏷️" },
      { id: "ap2-3", name: "Ver lección: 'Cómo crear un plato balanceado'", emoji: "🍽️" },
    ],
    nivel3: [
      { id: "ap3-1", name: "Ver lección: 'Índice glucémico en platos peruanos'", emoji: "📈" },
      { id: "ap3-2", name: "Ver lección: 'Manejo emocional de antojos'", emoji: "🧠" },
      { id: "ap3-3", name: "Ver lección: 'Qué hacer ante glucosa alta o baja'", emoji: "⚕️" },
    ],
  },
  monitoreo: {
    nivel1: [
      { id: "mo1-1", name: "Registrar glucosa en ayunas", emoji: "🩸" },
      { id: "mo1-2", name: "Registrar presión arterial", emoji: "💓" },
      { id: "mo1-3", name: "Registrar un síntoma (sed, cansancio, mareo)", emoji: "📝" },
    ],
    nivel2: [
      { id: "mo2-1", name: "Registrar glucosa después de una comida", emoji: "🍽️" },
      { id: "mo2-2", name: "Registrar glucosa antes y después del ejercicio", emoji: "🏃" },
    ],
    nivel3: [
      { id: "mo3-1", name: "Revisar mi porcentaje semanal de lecturas en rango", emoji: "📊" },
      { id: "mo3-2", name: "Registrar qué comí antes de una lectura alta", emoji: "📋" },
      { id: "mo3-3", name: "Aceptar una recomendación automática", emoji: "✨" },
    ],
  },
};

const NewHabit = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("nutricion");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleAddHabit = (habit: { id: string; name: string; emoji: string }) => {
    // TODO: Add to user's activities list
    toast.success("Hábito añadido", {
      description: habit.name,
    });
  };

  const toggleFavorite = (habitId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(habitId)) {
        newFavorites.delete(habitId);
      } else {
        newFavorites.add(habitId);
      }
      return newFavorites;
    });
  };

  const categoryHabits = HABITS_DATA[selectedCategory as keyof typeof HABITS_DATA];

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
              <p className="text-xs text-muted-foreground">
                Elige hábitos para añadir
              </p>
            </div>
            <div className="w-9" /> {/* Spacer for symmetry */}
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
                  selectedCategory === category.id
                    ? ""
                    : "opacity-50"
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
                <span className="text-[11px] font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Habits List */}
      <main className="max-w-2xl mx-auto px-4 py-4 pb-24">
        <div className="space-y-5">
          {/* Nivel 1 */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground mb-2.5 px-1">
              ⭐ Nivel 1 - Muy fácil
            </h2>
            <div className="space-y-2">
              {categoryHabits.nivel1.map((habit) => (
                <Card
                  key={habit.id}
                  className="p-2.5 flex items-center gap-2.5 hover:shadow-md transition-shadow"
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">{habit.emoji}</span>
                  <span className="text-sm flex-1 leading-snug line-clamp-2">{habit.name}</span>
                  <div className="flex gap-1 flex-shrink-0 items-center">
                    <button
                      onClick={() => toggleFavorite(habit.id)}
                      className="p-1.5 hover:bg-secondary rounded-full transition-colors"
                      aria-label="Favorito"
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
                      onClick={() => handleAddHabit(habit)}
                      className="p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors"
                      aria-label="Añadir hábito"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nivel 2 */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground mb-2.5 px-1">
              ⭐⭐ Nivel 2 - Intermedio
            </h2>
            <div className="space-y-2">
              {categoryHabits.nivel2.map((habit) => (
                <Card
                  key={habit.id}
                  className="p-2.5 flex items-center gap-2.5 hover:shadow-md transition-shadow"
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">{habit.emoji}</span>
                  <span className="text-sm flex-1 leading-snug line-clamp-2">{habit.name}</span>
                  <div className="flex gap-1 flex-shrink-0 items-center">
                    <button
                      onClick={() => toggleFavorite(habit.id)}
                      className="p-1.5 hover:bg-secondary rounded-full transition-colors"
                      aria-label="Favorito"
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
                      onClick={() => handleAddHabit(habit)}
                      className="p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors"
                      aria-label="Añadir hábito"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nivel 3 */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground mb-2.5 px-1">
              ⭐⭐⭐ Nivel 3 - Avanzado
            </h2>
            <div className="space-y-2">
              {categoryHabits.nivel3.map((habit) => (
                <Card
                  key={habit.id}
                  className="p-2.5 flex items-center gap-2.5 hover:shadow-md transition-shadow"
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">{habit.emoji}</span>
                  <span className="text-sm flex-1 leading-snug line-clamp-2">{habit.name}</span>
                  <div className="flex gap-1 flex-shrink-0 items-center">
                    <button
                      onClick={() => toggleFavorite(habit.id)}
                      className="p-1.5 hover:bg-secondary rounded-full transition-colors"
                      aria-label="Favorito"
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
                      onClick={() => handleAddHabit(habit)}
                      className="p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors"
                      aria-label="Añadir hábito"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewHabit;
