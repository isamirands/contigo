# Plan Detallado de Movimientos - Fase 2

## Resumen Ejecutivo

Este documento presenta el plan completo para reorganizar la estructura de `src/` del proyecto Contigo App. El plan incluye:
- **67 archivos** a mover (11 componentes principales + 56 componentes UI + archivos de soporte)
- **11 páginas** a mover
- **2 hooks** a mover
- **1 utilidad** a mover
- **4 archivos de datos** a mover
- **2 archivos de estilos** a mover

**Total estimado de archivos afectados por cambios de imports: ~80+ archivos**

---

## Estado Actual de src/

```
src/
├── assets/              [11 archivos PNG] - NO SE MUEVE
├── backend/             [Ya existe, con estructura vacía]
├── frontend/            [Ya existe, con estructura vacía]
├── shared/              [Ya existe, con estructura vacía]
├── components/          [67 archivos] - A MOVER
│   ├── ui/              [56 archivos]
│   └── [11 componentes principales]
├── pages/               [11 archivos] - A MOVER
├── hooks/               [2 archivos] - A MOVER
├── lib/                 [1 archivo] - A MOVER
├── data/                [4 archivos] - A MOVER
├── services/            [vacío] - NO SE MUEVE
├── App.css              - A MOVER
├── index.css            - A MOVER
├── App.tsx              - NO SE MUEVE
├── main.tsx             - NO SE MUEVE
└── vite-env.d.ts        - NO SE MUEVE
```

---

## Plan de Movimientos Detallado

### GRUPO 1: Componentes React → frontend/components/

**Destino:** `src/frontend/components/`

#### Componentes Principales (11 archivos)
```
src/components/ActivityReminderModal.tsx     → src/frontend/components/ActivityReminderModal.tsx
src/components/ActivitySliderCard.tsx        → src/frontend/components/ActivitySliderCard.tsx
src/components/BottomNav.tsx                 → src/frontend/components/BottomNav.tsx
src/components/CompletionCelebration.tsx     → src/frontend/components/CompletionCelebration.tsx
src/components/EducationalModal.tsx          → src/frontend/components/EducationalModal.tsx
src/components/HabitCard.tsx                 → src/frontend/components/HabitCard.tsx
src/components/NavLink.tsx                   → src/frontend/components/NavLink.tsx
src/components/RemindersModal.tsx            → src/frontend/components/RemindersModal.tsx
src/components/TigoWalkingStrip.tsx          → src/frontend/components/TigoWalkingStrip.tsx
src/components/UnifiedHeader.tsx             → src/frontend/components/UnifiedHeader.tsx
src/components/WeeklyCalendar.tsx            → src/frontend/components/WeeklyCalendar.tsx
```

#### Componentes UI (56 archivos)
**Destino:** `src/frontend/components/ui/`

```
src/components/ui/accordion.tsx              → src/frontend/components/ui/accordion.tsx
src/components/ui/alert-dialog.tsx           → src/frontend/components/ui/alert-dialog.tsx
src/components/ui/alert.tsx                  → src/frontend/components/ui/alert.tsx
src/components/ui/aspect-ratio.tsx           → src/frontend/components/ui/aspect-ratio.tsx
src/components/ui/avatar.tsx                 → src/frontend/components/ui/avatar.tsx
src/components/ui/badge.tsx                  → src/frontend/components/ui/badge.tsx
src/components/ui/breadcrumb.tsx             → src/frontend/components/ui/breadcrumb.tsx
src/components/ui/button.tsx                 → src/frontend/components/ui/button.tsx
src/components/ui/calendar.tsx               → src/frontend/components/ui/calendar.tsx
src/components/ui/card.tsx                   → src/frontend/components/ui/card.tsx
src/components/ui/carousel.tsx               → src/frontend/components/ui/carousel.tsx
src/components/ui/chart.tsx                  → src/frontend/components/ui/chart.tsx
src/components/ui/checkbox.tsx               → src/frontend/components/ui/checkbox.tsx
src/components/ui/collapsible.tsx            → src/frontend/components/ui/collapsible.tsx
src/components/ui/command.tsx                → src/frontend/components/ui/command.tsx
src/components/ui/context-menu.tsx           → src/frontend/components/ui/context-menu.tsx
src/components/ui/dialog.tsx                 → src/frontend/components/ui/dialog.tsx
src/components/ui/drawer.tsx                 → src/frontend/components/ui/drawer.tsx
src/components/ui/dropdown-menu.tsx          → src/frontend/components/ui/dropdown-menu.tsx
src/components/ui/form.tsx                   → src/frontend/components/ui/form.tsx
src/components/ui/hover-card.tsx             → src/frontend/components/ui/hover-card.tsx
src/components/ui/input-otp.tsx              → src/frontend/components/ui/input-otp.tsx
src/components/ui/input.tsx                  → src/frontend/components/ui/input.tsx
src/components/ui/label.tsx                  → src/frontend/components/ui/label.tsx
src/components/ui/menubar.tsx                → src/frontend/components/ui/menubar.tsx
src/components/ui/navigation-menu.tsx        → src/frontend/components/ui/navigation-menu.tsx
src/components/ui/pagination.tsx             → src/frontend/components/ui/pagination.tsx
src/components/ui/popover.tsx                → src/frontend/components/ui/popover.tsx
src/components/ui/progress.tsx               → src/frontend/components/ui/progress.tsx
src/components/ui/radio-group.tsx            → src/frontend/components/ui/radio-group.tsx
src/components/ui/resizable.tsx              → src/frontend/components/ui/resizable.tsx
src/components/ui/scroll-area.tsx            → src/frontend/components/ui/scroll-area.tsx
src/components/ui/select.tsx                 → src/frontend/components/ui/select.tsx
src/components/ui/separator.tsx              → src/frontend/components/ui/separator.tsx
src/components/ui/sheet.tsx                  → src/frontend/components/ui/sheet.tsx
src/components/ui/sidebar.tsx                → src/frontend/components/ui/sidebar.tsx
src/components/ui/skeleton.tsx               → src/frontend/components/ui/skeleton.tsx
src/components/ui/slider.tsx                 → src/frontend/components/ui/slider.tsx
src/components/ui/sonner.tsx                 → src/frontend/components/ui/sonner.tsx
src/components/ui/switch.tsx                 → src/frontend/components/ui/switch.tsx
src/components/ui/table.tsx                  → src/frontend/components/ui/table.tsx
src/components/ui/tabs.tsx                   → src/frontend/components/ui/tabs.tsx
src/components/ui/textarea.tsx               → src/frontend/components/ui/textarea.tsx
src/components/ui/toast.tsx                  → src/frontend/components/ui/toast.tsx
src/components/ui/toaster.tsx                → src/frontend/components/ui/toaster.tsx
src/components/ui/toggle-group.tsx           → src/frontend/components/ui/toggle-group.tsx
src/components/ui/toggle.tsx                 → src/frontend/components/ui/toggle.tsx
src/components/ui/tooltip.tsx                → src/frontend/components/ui/tooltip.tsx
src/components/ui/use-toast.ts               → src/frontend/components/ui/use-toast.ts
```

---

### GRUPO 2: Páginas → frontend/pages/

**Destino:** `src/frontend/pages/`

```
src/pages/ExplorarForos.tsx                  → src/frontend/pages/ExplorarForos.tsx
src/pages/GlobalJourney.tsx                  → src/frontend/pages/GlobalJourney.tsx
src/pages/Home.tsx                           → src/frontend/pages/Home.tsx
src/pages/Journey.tsx                        → src/frontend/pages/Journey.tsx
src/pages/Metrics.tsx                        → src/frontend/pages/Metrics.tsx
src/pages/NewHabit.tsx                       → src/frontend/pages/NewHabit.tsx
src/pages/NotFound.tsx                       → src/frontend/pages/NotFound.tsx
src/pages/PostDetail.tsx                     → src/frontend/pages/PostDetail.tsx
src/pages/Scoreboard.tsx                     → src/frontend/pages/Scoreboard.tsx
src/pages/Settings.tsx                       → src/frontend/pages/Settings.tsx
src/pages/Teams.tsx                          → src/frontend/pages/Teams.tsx
```

---

### GRUPO 3: Hooks → frontend/utils/hooks/

**Destino:** `src/frontend/utils/hooks/`

```
src/hooks/use-mobile.tsx                     → src/frontend/utils/hooks/use-mobile.tsx
src/hooks/use-toast.ts                       → src/frontend/utils/hooks/use-toast.ts
```

---

### GRUPO 4: Utilidades → frontend/utils/lib/

**Destino:** `src/frontend/utils/lib/`

```
src/lib/utils.ts                             → src/frontend/utils/lib/utils.ts
```

---

### GRUPO 5: Estilos → frontend/styles/

**Destino:** `src/frontend/styles/`

```
src/App.css                                  → src/frontend/styles/App.css
src/index.css                                → src/frontend/styles/index.css
```

---

### GRUPO 6: Datos → shared/constants/

**Destino:** `src/shared/constants/`

```
src/data/educationalContent.ts               → src/shared/constants/educationalContent.ts
src/data/educationalHabit.ts                 → src/shared/constants/educationalHabit.ts
src/data/teamData.ts                         → src/shared/constants/teamData.ts
src/data/teamsData.ts                        → src/shared/constants/teamsData.ts
```

---

### ARCHIVOS QUE NO SE MUEVEN

```
src/assets/                                  [PERMANECE EN src/assets/]
src/App.tsx                                  [PERMANECE EN src/App.tsx]
src/main.tsx                                 [PERMANECE EN src/main.tsx]
src/vite-env.d.ts                            [PERMANECE EN src/vite-env.d.ts]
src/services/                                [PERMANECE VACÍO]
src/backend/                                 [YA EXISTE, NO SE TOCA]
src/frontend/                                [YA EXISTE, RECIBE ARCHIVOS]
src/shared/                                  [YA EXISTE, RECIBE ARCHIVOS]
```

---

## Análisis de Imports Afectados

### Patrón de Imports Actual

El proyecto usa el alias `@/` que apunta a `src/`. Ejemplos:

```typescript
// Imports actuales
import { Button } from "@/components/ui/button";
import { Home } from "@/pages/Home";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { teamData } from "@/data/teamData";
```

### Patrón de Imports Después del Movimiento

```typescript
// Imports después del movimiento
import { Button } from "@/frontend/components/ui/button";
import { Home } from "@/frontend/pages/Home";
import { useToast } from "@/frontend/utils/hooks/use-toast";
import { cn } from "@/frontend/utils/lib/utils";
import { teamData } from "@/shared/constants/teamData";
```

---

## Archivos con Imports que Necesitan Actualización

### Categoría 1: Archivos Raíz (2 archivos)
```
src/App.tsx                    - Importa: components/ui/*, pages/*
src/main.tsx                   - Importa: App.tsx, index.css
```

### Categoría 2: Componentes Principales (11 archivos)
Todos los archivos en `src/components/` que importan:
- Otros componentes (`@/components/*`)
- Componentes UI (`@/components/ui/*`)
- Hooks (`@/hooks/*`)
- Utilidades (`@/lib/*`)
- Datos (`@/data/*`)

### Categoría 3: Componentes UI (56 archivos)
Todos los archivos en `src/components/ui/` que importan:
- Utilidades (`@/lib/utils`)
- Hooks (`@/hooks/*`)
- Otros componentes UI (`@/components/ui/*`)

### Categoría 4: Páginas (11 archivos)
Todos los archivos en `src/pages/` que importan:
- Componentes (`@/components/*`)
- Componentes UI (`@/components/ui/*`)
- Hooks (`@/hooks/*`)
- Datos (`@/data/*`)

### Categoría 5: Hooks (2 archivos)
```
src/hooks/use-toast.ts         - Importa: @/components/ui/toast
```

### Categoría 6: Componentes UI Especiales (2 archivos)
```
src/components/ui/use-toast.ts - Importa: @/hooks/use-toast
src/components/ui/toaster.tsx  - Importa: @/hooks/use-toast, @/components/ui/toast
```

**Total estimado: ~82 archivos necesitarán actualización de imports**

---

## Mapeo de Transformación de Imports

| Import Actual | Import Nuevo |
|---------------|--------------|
| `@/components/*` | `@/frontend/components/*` |
| `@/components/ui/*` | `@/frontend/components/ui/*` |
| `@/pages/*` | `@/frontend/pages/*` |
| `@/hooks/*` | `@/frontend/utils/hooks/*` |
| `@/lib/*` | `@/frontend/utils/lib/*` |
| `@/data/*` | `@/shared/constants/*` |
| `@/assets/*` | `@/assets/*` (sin cambios) |
| `./App.tsx` | `./App.tsx` (sin cambios) |
| `./index.css` | `@/frontend/styles/index.css` |
| `./App.css` | (imports relativos en App.tsx) |

---

## Riesgos Identificados

### 🔴 Alto Riesgo
1. **Imports circulares**: `use-toast.ts` en hooks y en components/ui
   - Solución: Actualizar ambos archivos simultáneamente
   
2. **Imports relativos**: Algunos archivos pueden usar imports relativos (`./`, `../`)
   - Solución: Convertir a imports absolutos con alias `@/`

### 🟡 Medio Riesgo
1. **Archivos de estilos**: `App.css` e `index.css` importados en múltiples lugares
   - Solución: Actualizar imports en `App.tsx` y `main.tsx`

2. **Componentes UI interdependientes**: Muchos componentes UI se importan entre sí
   - Solución: Actualizar todos los imports de `@/components/ui/*` a `@/frontend/components/ui/*`

### 🟢 Bajo Riesgo
1. **Assets**: No se mueven, por lo que no hay riesgo
2. **Archivos raíz**: `App.tsx`, `main.tsx` no se mueven

---

## Orden de Ejecución Recomendado

### Fase 1: Preparación
1. Crear backup con git commit
2. Verificar que estructura frontend/, backend/, shared/ existe

### Fase 2: Movimiento de Archivos (en orden)
1. **Mover estilos** (menor dependencia)
2. **Mover utilidades** (lib/utils.ts)
3. **Mover hooks** (use-mobile, use-toast)
4. **Mover datos** (educationalContent, teamData, etc.)
5. **Mover componentes UI** (56 archivos)
6. **Mover componentes principales** (11 archivos)
7. **Mover páginas** (11 archivos)

### Fase 3: Actualización de Imports (en orden)
1. **Actualizar archivos raíz** (App.tsx, main.tsx)
2. **Actualizar componentes UI** (imports de utils, hooks)
3. **Actualizar componentes principales** (imports de UI, hooks, datos)
4. **Actualizar páginas** (imports de componentes, hooks, datos)
5. **Actualizar hooks** (imports de components/ui)

### Fase 4: Validación
1. Ejecutar TypeScript compiler
2. Ejecutar build
3. Verificar que no hay imports rotos
4. Ejecutar aplicación en modo dev

---

## Checklist de Validación

### Pre-Movimiento
- [ ] Backup creado (git commit)
- [ ] Estructura frontend/, backend/, shared/ existe
- [ ] Plan revisado y aprobado por usuario

### Post-Movimiento
- [ ] Todos los archivos movidos correctamente
- [ ] Carpetas antiguas eliminadas (components/, pages/, hooks/, lib/, data/)
- [ ] No hay archivos duplicados

### Post-Actualización de Imports
- [ ] No hay errores de TypeScript
- [ ] `npm run build` completa sin errores
- [ ] No hay imports rotos (verificado con análisis estático)
- [ ] `npm run dev` inicia correctamente
- [ ] Aplicación funciona como antes

---

## Estimación de Tiempo

- **Movimiento de archivos**: 10-15 minutos
- **Actualización de imports**: 20-30 minutos
- **Validación y corrección**: 15-20 minutos
- **Total**: 45-65 minutos

---

## Notas Adicionales

1. **Carpeta services/**: Está vacía, no requiere acción
2. **Carpeta assets/**: Permanece en `src/assets/` por convención
3. **Archivos backend/**: Ya existen con estructura vacía, no se tocan
4. **Alias de configuración**: No se requieren cambios en vite.config.ts o tsconfig.json si usamos el alias `@/` existente

---

## Aprobación Requerida

Este plan requiere aprobación del usuario antes de proceder con la ejecución. 

**¿Aprobar este plan y proceder con la reorganización?**
