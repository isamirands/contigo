# Design Document

## Overview

Este diseño describe la estrategia para reorganizar el proyecto Contigo App en dos fases principales:

**Fase 1**: Mover el contenido de `contigo_app_lovable/` a la raíz del repositorio
**Fase 2**: Reorganizar `src/` con la estructura frontend/, backend/, shared/

El enfoque prioriza la seguridad y la preservación de la funcionalidad existente, con validación en cada paso.

## Architecture

### Fase 1: Movimiento a Raíz

```
ANTES:
.
├── .git/
├── .kiro/
└── contigo_app_lovable/
    ├── src/
    ├── public/
    ├── package.json
    ├── vite.config.ts
    └── ...

DESPUÉS:
.
├── .git/
├── .kiro/
├── src/
├── public/
├── package.json
├── vite.config.ts
└── ...
```

### Fase 2: Reorganización de src/

```
ANTES:
src/
├── components/
├── pages/
├── hooks/
├── lib/
├── data/
├── services/
├── assets/
├── App.tsx
└── main.tsx

DESPUÉS:
src/
├── frontend/
│   ├── components/    # Componentes React (movidos desde src/components/)
│   ├── pages/         # Páginas (movidas desde src/pages/)
│   ├── styles/        # Estilos (App.css, index.css)
│   └── utils/         # Utilidades frontend (hooks/, lib/)
├── backend/
│   ├── api/           # Endpoints (vacío inicialmente)
│   ├── models/        # Modelos de datos (vacío inicialmente)
│   ├── services/      # Lógica de negocio (movido desde src/services/)
│   └── utils/         # Utilidades backend (vacío inicialmente)
├── shared/
│   ├── types/         # Tipos TypeScript compartidos (vacío inicialmente)
│   └── constants/     # Constantes (movido desde src/data/)
├── assets/            # Assets permanecen en raíz de src/
├── App.tsx            # Archivos raíz permanecen
└── main.tsx
```

## Components and Interfaces

### 1. File Mover Service

Responsable de mover archivos y actualizar referencias.

```typescript
interface FileMoverService {
  // Mueve un archivo de origen a destino
  moveFile(source: string, destination: string): Promise<void>;
  
  // Mueve múltiples archivos según un plan
  executeMovesPlan(plan: MovePlan): Promise<MoveResult>;
  
  // Actualiza imports en un archivo
  updateImports(filePath: string, oldPath: string, newPath: string): Promise<void>;
}

interface MovePlan {
  moves: Array<{
    source: string;
    destination: string;
    type: 'file' | 'directory';
  }>;
}

interface MoveResult {
  success: boolean;
  movedFiles: string[];
  failedFiles: Array<{ file: string; error: string }>;
  updatedImports: string[];
}
```

### 2. Configuration Updater

Actualiza archivos de configuración con nuevas rutas.

```typescript
interface ConfigurationUpdater {
  // Actualiza vite.config.ts si es necesario
  updateViteConfig(changes: ConfigChange[]): Promise<void>;
  
  // Actualiza tsconfig.json si es necesario
  updateTsConfig(changes: ConfigChange[]): Promise<void>;
  
  // Valida que las configuraciones sean correctas
  validateConfigs(): Promise<ValidationResult>;
}

interface ConfigChange {
  file: string;
  property: string;
  oldValue: string;
  newValue: string;
  reason: string;
}
```

### 3. Import Analyzer

Analiza y actualiza imports en archivos TypeScript/JavaScript.

```typescript
interface ImportAnalyzer {
  // Encuentra todos los imports en un archivo
  findImports(filePath: string): Promise<Import[]>;
  
  // Actualiza imports basado en movimientos de archivos
  updateImportsForMove(filePath: string, movedFiles: Map<string, string>): Promise<void>;
  
  // Valida que no haya imports rotos
  validateImports(directory: string): Promise<BrokenImport[]>;
}

interface Import {
  importPath: string;
  isRelative: boolean;
  resolvedPath: string;
  line: number;
}

interface BrokenImport {
  file: string;
  importPath: string;
  line: number;
  suggestion?: string;
}
```

## Data Models

### Move Plan Structure

```typescript
type MovePhase = 'root-migration' | 'src-reorganization';

interface ProjectReorganizationPlan {
  phase: MovePhase;
  description: string;
  moves: FileMove[];
  configUpdates: ConfigUpdate[];
  estimatedImpact: Impact;
}

interface FileMove {
  source: string;
  destination: string;
  type: 'file' | 'directory';
  affectedImports: string[];
  requiresUserApproval: boolean;
}

interface ConfigUpdate {
  file: string;
  changes: Array<{
    path: string;  // JSON path o línea
    before: string;
    after: string;
    reason: string;
  }>;
}

interface Impact {
  filesAffected: number;
  importsToUpdate: number;
  configFilesChanged: number;
  riskLevel: 'low' | 'medium' | 'high';
}
```

## Implementation Strategy

### Fase 1: Movimiento a Raíz

**Paso 1.1: Análisis Inicial**
- Listar todos los archivos en `contigo_app_lovable/`
- Identificar archivos de configuración que necesitan actualización
- Generar plan de movimiento

**Paso 1.2: Movimiento de Archivos**
- Mover archivos y carpetas de `contigo_app_lovable/` a raíz
- Preservar estructura interna (src/, public/, etc.)
- No modificar contenido de archivos todavía

**Paso 1.3: Actualización de Configuraciones**
- Actualizar `vite.config.ts`: Cambiar `path.resolve(__dirname, "./src")` si es necesario
- Actualizar `tsconfig.json`: Verificar que paths sigan funcionando
- Actualizar `package.json`: Verificar scripts si referencian rutas

**Paso 1.4: Validación**
- Ejecutar `npm install` para verificar dependencias
- Ejecutar `npm run build` para verificar que compila
- Verificar que no hay errores de TypeScript

### Fase 2: Reorganización de src/

**Paso 2.1: Crear Estructura de Carpetas**
```
src/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── utils/
└── shared/
    ├── types/
    └── constants/
```

**Paso 2.2: Plan de Movimiento de Archivos**

Mapeo propuesto:

| Origen | Destino | Razón |
|--------|---------|-------|
| `src/components/` | `src/frontend/components/` | Componentes React son frontend |
| `src/pages/` | `src/frontend/pages/` | Páginas son frontend |
| `src/hooks/` | `src/frontend/utils/hooks/` | Hooks son utilidades de frontend |
| `src/lib/` | `src/frontend/utils/lib/` | Utilidades generales de frontend |
| `src/App.css` | `src/frontend/styles/App.css` | Estilos son frontend |
| `src/index.css` | `src/frontend/styles/index.css` | Estilos son frontend |
| `src/data/` | `src/shared/constants/` | Datos estáticos son compartidos |
| `src/services/` | `src/backend/services/` | Servicios son lógica de backend |
| `src/assets/` | `src/assets/` | Assets permanecen en raíz |
| `src/App.tsx` | `src/App.tsx` | Archivo raíz permanece |
| `src/main.tsx` | `src/main.tsx` | Archivo raíz permanece |

**Paso 2.3: Actualización de Imports**

Todos los imports necesitarán actualizarse. Ejemplos:

```typescript
// ANTES
import { Button } from '@/components/ui/button';
import { Home } from '@/pages/Home';
import { useToast } from '@/hooks/use-toast';

// DESPUÉS
import { Button } from '@/frontend/components/ui/button';
import { Home } from '@/frontend/pages/Home';
import { useToast } from '@/frontend/utils/hooks/use-toast';
```

**Paso 2.4: Actualización de Configuraciones**

Posibles cambios en `vite.config.ts`:
```typescript
// Puede necesitar ajustes en alias si usamos paths específicos
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@frontend": path.resolve(__dirname, "./src/frontend"),
    "@backend": path.resolve(__dirname, "./src/backend"),
    "@shared": path.resolve(__dirname, "./src/shared"),
  },
}
```

Posibles cambios en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@frontend/*": ["./src/frontend/*"],
      "@backend/*": ["./src/backend/*"],
      "@shared/*": ["./src/shared/*"]
    }
  }
}
```

**Paso 2.5: Creación de Archivos de Documentación**

Crear README.md en cada carpeta principal:

- `src/frontend/README.md`: Explica que contiene componentes React, páginas, estilos
- `src/backend/README.md`: Explica que contendrá API, modelos, servicios
- `src/shared/README.md`: Explica que contiene código compartido entre frontend y backend

**Paso 2.6: Validación Final**
- Ejecutar TypeScript compiler para verificar tipos
- Ejecutar build para verificar que compila
- Verificar que no hay imports rotos
- Ejecutar la aplicación en modo dev para verificar funcionalidad

## Error Handling

### Estrategias de Manejo de Errores

1. **Backup Automático**: Antes de cualquier movimiento, crear un commit en git
2. **Rollback**: Si algo falla, revertir cambios usando git
3. **Validación Incremental**: Validar después de cada fase
4. **Logs Detallados**: Registrar cada operación para debugging

### Casos de Error Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Import no encontrado | Ruta actualizada incorrectamente | Usar análisis de AST para encontrar imports correctos |
| Conflicto de archivos | Archivo ya existe en destino | Preguntar al usuario antes de sobrescribir |
| Build falla | Configuración incorrecta | Revertir cambios de configuración y revisar |
| TypeScript errors | Tipos no resueltos | Actualizar paths en tsconfig.json |

## Testing Strategy

### Validación Manual

Después de cada fase, el usuario debe:
1. Ejecutar `npm install` (si es necesario)
2. Ejecutar `npm run build`
3. Ejecutar `npm run dev`
4. Verificar que la aplicación carga correctamente
5. Probar navegación básica

### Validación Automatizada

El sistema debe:
1. Verificar que todos los archivos fueron movidos
2. Escanear imports rotos usando análisis estático
3. Ejecutar TypeScript compiler en modo check
4. Verificar que build completa sin errores

### Checklist de Validación

**Fase 1 - Movimiento a Raíz:**
- [ ] Todos los archivos movidos de contigo_app_lovable/ a raíz
- [ ] Carpeta contigo_app_lovable/ eliminada
- [ ] package.json funciona correctamente
- [ ] vite.config.ts funciona correctamente
- [ ] tsconfig.json funciona correctamente
- [ ] `npm run build` completa sin errores
- [ ] `npm run dev` inicia correctamente

**Fase 2 - Reorganización src/:**
- [ ] Estructura de carpetas creada correctamente
- [ ] Todos los archivos movidos según el plan
- [ ] Imports actualizados en todos los archivos
- [ ] Configuraciones actualizadas (vite, tsconfig)
- [ ] No hay errores de TypeScript
- [ ] `npm run build` completa sin errores
- [ ] `npm run dev` inicia correctamente
- [ ] Aplicación funciona como antes

## Risk Assessment

### Riesgos Identificados

1. **Imports Rotos (Alto)**: Muchos archivos con imports relativos
   - Mitigación: Análisis exhaustivo de imports y actualización automática
   
2. **Configuración Incorrecta (Medio)**: Cambios en vite.config.ts o tsconfig.json
   - Mitigación: Validar configuraciones antes y después de cambios
   
3. **Pérdida de Archivos (Bajo)**: Archivos no movidos correctamente
   - Mitigación: Usar git para tracking y backup
   
4. **Build Failures (Medio)**: Proyecto no compila después de cambios
   - Mitigación: Validación incremental y rollback rápido

## Rollback Plan

Si algo sale mal en cualquier fase:

1. **Detener inmediatamente** cualquier operación en progreso
2. **Usar git** para revertir cambios: `git reset --hard HEAD`
3. **Revisar logs** para identificar qué falló
4. **Ajustar plan** basado en el error encontrado
5. **Reintentar** con el plan ajustado

## Timeline Estimado

- **Fase 1**: 15-30 minutos
  - Análisis: 5 min
  - Movimiento: 5 min
  - Actualización configs: 5 min
  - Validación: 10 min

- **Fase 2**: 30-60 minutos
  - Crear estructura: 5 min
  - Generar plan: 10 min
  - Mover archivos: 10 min
  - Actualizar imports: 15 min
  - Validación: 20 min

**Total estimado**: 45-90 minutos

## Next Steps

1. Obtener aprobación del usuario para este diseño
2. Crear plan detallado de tareas en tasks.md
3. Ejecutar Fase 1 con validación
4. Ejecutar Fase 2 con validación
5. Documentar cambios finales
