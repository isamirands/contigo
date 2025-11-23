# Requirements Document

## Introduction

Este documento define los requisitos para reorganizar la estructura del proyecto Contigo App. Incluye dos cambios principales: (1) mover el contenido de la carpeta `contigo_app_lovable/` a la raíz del repositorio, y (2) reorganizar el código dentro de `src/` separando claramente frontend, backend y código compartido. El objetivo es mejorar la mantenibilidad, escalabilidad y claridad del proyecto sin romper la funcionalidad existente.

## Glossary

- **Sistema**: El sistema de reorganización de estructura de carpetas
- **Proyecto**: La aplicación Contigo App existente
- **Estructura Objetivo**: La nueva organización de carpetas (frontend/, backend/, shared/)
- **Archivos Existentes**: Todos los archivos y carpetas actualmente en src/
- **Imports**: Referencias de módulos en archivos TypeScript/JavaScript

## Requirements

### Requirement 1

**User Story:** Como desarrollador, quiero mover el contenido de contigo_app_lovable/ a la raíz del repositorio, para que la estructura del proyecto sea más limpia y estándar.

#### Acceptance Criteria

1. WHEN el sistema mueve archivos a la raíz THEN el sistema SHALL mover todos los archivos y carpetas de contigo_app_lovable/ al nivel raíz del repositorio
2. WHEN el sistema mueve archivos THEN el sistema SHALL preservar la estructura interna de carpetas (src/, public/, etc.)
3. WHEN el sistema mueve archivos de configuración THEN el sistema SHALL actualizar las rutas en package.json, tsconfig.json, vite.config.ts y otros archivos de configuración
4. WHEN el sistema completa el movimiento THEN el sistema SHALL eliminar la carpeta contigo_app_lovable/ vacía
5. WHEN el sistema actualiza configuraciones THEN el sistema SHALL verificar que todas las rutas relativas sigan funcionando correctamente

### Requirement 2

**User Story:** Como desarrollador, quiero una estructura de carpetas clara que separe frontend, backend y código compartido, para que el proyecto sea más mantenible y escalable.

#### Acceptance Criteria

1. WHEN el sistema crea la estructura de carpetas THEN el sistema SHALL crear los directorios frontend/, backend/ y shared/ dentro de src/
2. WHEN el sistema crea subdirectorios THEN el sistema SHALL crear components/, pages/, styles/ y utils/ dentro de frontend/
3. WHEN el sistema crea subdirectorios de backend THEN el sistema SHALL crear api/, models/, services/ y utils/ dentro de backend/
4. WHEN el sistema crea subdirectorios compartidos THEN el sistema SHALL crear types/ y constants/ dentro de shared/
5. WHEN una carpeta ya existe THEN el sistema SHALL reutilizar la carpeta existente sin crear duplicados

### Requirement 3

**User Story:** Como desarrollador, quiero una estructura de carpetas clara que separe frontend, backend y código compartido dentro de src/, para que el proyecto sea más mantenible y escalable.

#### Acceptance Criteria

1. WHEN el sistema crea la estructura de carpetas THEN el sistema SHALL crear los directorios frontend/, backend/ y shared/ dentro de src/
2. WHEN el sistema crea subdirectorios THEN el sistema SHALL crear components/, pages/, styles/ y utils/ dentro de frontend/
3. WHEN el sistema crea subdirectorios de backend THEN el sistema SHALL crear api/, models/, services/ y utils/ dentro de backend/
4. WHEN el sistema crea subdirectorios compartidos THEN el sistema SHALL crear types/ y constants/ dentro de shared/
5. WHEN una carpeta ya existe THEN el sistema SHALL reutilizar la carpeta existente sin crear duplicados

### Requirement 4

**User Story:** Como desarrollador, quiero que los archivos existentes no se pierdan ni se sobrescriban, para que la funcionalidad actual del proyecto se mantenga intacta.

#### Acceptance Criteria

1. WHEN el sistema reorganiza archivos THEN el sistema SHALL preservar todos los archivos existentes sin eliminarlos
2. WHEN el sistema encuentra un archivo en una ubicación THEN el sistema SHALL no sobrescribir ese archivo a menos que sea estrictamente necesario
3. WHEN el sistema mueve archivos THEN el sistema SHALL actualizar todas las referencias de imports en los archivos afectados
4. WHEN el sistema completa la reorganización THEN el sistema SHALL mantener la funcionalidad existente del proyecto sin errores de compilación

### Requirement 5

**User Story:** Como desarrollador, quiero un plan claro de qué archivos deben moverse a cada carpeta, para que pueda revisar y aprobar los cambios antes de ejecutarlos.

#### Acceptance Criteria

1. WHEN el sistema analiza la estructura actual THEN el sistema SHALL identificar qué archivos pertenecen a frontend/, backend/ o shared/
2. WHEN el sistema genera un plan THEN el sistema SHALL presentar una lista detallada de movimientos propuestos
3. WHEN el sistema presenta el plan THEN el sistema SHALL esperar confirmación del usuario antes de ejecutar movimientos
4. WHEN el usuario rechaza el plan THEN el sistema SHALL permitir ajustes antes de proceder

### Requirement 6

**User Story:** Como desarrollador, quiero que las configuraciones globales no se modifiquen innecesariamente, para que el proyecto mantenga su configuración actual de build y desarrollo.

#### Acceptance Criteria

1. WHEN el sistema reorganiza archivos THEN el sistema SHALL preservar package.json sin cambios innecesarios
2. WHEN el sistema reorganiza archivos THEN el sistema SHALL preservar tsconfig.json sin cambios innecesarios
3. WHEN el sistema reorganiza archivos THEN el sistema SHALL preservar vite.config.ts sin cambios innecesarios
4. WHEN una modificación de configuración es necesaria THEN el sistema SHALL explicar exactamente qué cambio se requiere y por qué
5. WHEN el sistema modifica configuraciones THEN el sistema SHALL solicitar aprobación del usuario antes de aplicar cambios

### Requirement 7

**User Story:** Como desarrollador, quiero que la nueva estructura incluya archivos mínimos de documentación, para que cada carpeta tenga un propósito claro.

#### Acceptance Criteria

1. WHEN el sistema crea una carpeta nueva THEN el sistema SHALL crear un archivo README.md o index.ts mínimo si es apropiado
2. WHEN el sistema crea archivos de documentación THEN el sistema SHALL incluir una descripción breve del propósito de la carpeta
3. WHEN el sistema crea archivos index THEN el sistema SHALL crear archivos vacíos o con exports mínimos
4. WHEN el sistema completa la estructura THEN el sistema SHALL asegurar que todas las carpetas principales tengan documentación básica

### Requirement 8

**User Story:** Como desarrollador, quiero que el sistema valide que todos los imports funcionan correctamente después de la reorganización, para que no haya errores en tiempo de ejecución.

#### Acceptance Criteria

1. WHEN el sistema mueve un archivo THEN el sistema SHALL actualizar todos los imports relativos que apuntan a ese archivo
2. WHEN el sistema actualiza imports THEN el sistema SHALL mantener la resolución correcta de módulos
3. WHEN el sistema completa la reorganización THEN el sistema SHALL verificar que no hay imports rotos
4. WHEN el sistema detecta imports rotos THEN el sistema SHALL reportar los archivos afectados y sugerir correcciones
