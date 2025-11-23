# Funcionalidad de Hábito Educativo

## Descripción

Se ha implementado un comportamiento especial para el hábito **"Leer artículo educativo"**.

El título completo del artículo ("Hipoglucemia e hiperglucemia") se muestra en el header del modal educativo.

## Comportamiento

### Hábito Educativo Específico
- **Nombre del hábito**: "Leer artículo educativo"
- **Título del artículo**: "Hipoglucemia e hiperglucemia" (se muestra en el modal)
- **Comportamiento al hacer tap**: NO hace nada (deshabilitado)
- **Comportamiento al hacer slide**: Abre el modal educativo (NO marca como completado)
- **Marcado como completado**: Solo al presionar "Confirmar lectura" en el último slide o después de terminar el audio

### Flujo Educativo

1. **Modal con slides educativos**
   - 4 slides con información sobre glucosa, hiperglucemia e hipoglucemia
   - Navegación manual entre slides (botones Anterior/Siguiente)
   - Indicador de progreso (Slide X de 4)

2. **Botón de audio**
   - Texto exacto: **"Deja que tu Tigo te lo explique"**
   - Ubicación: Parte inferior del modal, grande y visible
   - El audio NO se reproduce automáticamente

3. **Reproducción de audio**
   - Solo inicia cuando el usuario pulsa el botón
   - Cambia de slide automáticamente según `audio.sync` y el tiempo del audio
   - Para MVP: simulación con intervalos de 60 segundos por slide
   - En producción: usar archivo de audio real con `currentTime`

4. **Cierre del modal y completado**
   - Al cerrar el modal (botón X, clic fuera, o cualquier acción de cierre):
     - El audio se detiene automáticamente
     - El hábito se marca como COMPLETADO
   - No es necesario terminar el audio ni ver todos los slides
   - El criterio de completado es: abrir y cerrar el modal

### Otros Hábitos
- Mantienen el comportamiento estándar de deslizar para completar
- No se ven afectados por esta funcionalidad

## Archivos Creados/Modificados

### Nuevos Archivos
1. **`src/data/educationalContent.ts`**
   - Contiene el JSON exacto del contenido educativo
   - Estructura: slides + audio.sync
   - NO modificar el contenido sin autorización

2. **`src/components/EducationalModal.tsx`**
   - Modal que muestra el contenido educativo
   - Maneja la navegación entre slides
   - Controla la reproducción del audio (simulada para MVP)
   - Sincroniza slides con el tiempo del audio

### Archivos Modificados
1. **`src/components/ActivitySliderCard.tsx`**
   - Agregado prop `onEducationalClick`
   - Detecta si el título es el hábito educativo
   - Cambia comportamiento: tap abre modal en lugar de deslizar

2. **`src/pages/Home.tsx`**
   - Importa `EducationalModal`
   - Agregado estado para controlar el modal educativo
   - Actualizado el hábito existente de Ana "Leer artículo educativo" con el título completo
   - Maneja apertura/cierre del modal y completado del hábito

## Integración de Audio Real

### Ubicación del Archivo
Sube tu archivo de audio aquí:
```
contigo_app_lovable/public/audio/hipoglucemia-hiperglucemia.wav
```

### Formato Recomendado
- **Formato**: WAV o MP3
- **Duración**: ~240 segundos (4 minutos)
- **Sincronización**:
  - Slide 1: 0-59 segundos
  - Slide 2: 60-119 segundos
  - Slide 3: 120-179 segundos
  - Slide 4: 180-240 segundos

### Funcionamiento Automático
El código ya está preparado para:
1. ✅ Intentar cargar el audio real desde `/audio/hipoglucemia-hiperglucemia.wav`
2. ✅ Sincronizar slides automáticamente con el tiempo del audio
3. ✅ Si el archivo no existe, usar simulación como respaldo
4. ✅ Detectar cuando el audio termina

### Cambiar a MP3
Si usas MP3 en lugar de WAV, solo cambia el nombre del archivo a:
```
hipoglucemia-hiperglucemia.mp3
```
Y actualiza la línea en `EducationalModal.tsx`:
```typescript
audioRef.current = new Audio('/audio/hipoglucemia-hiperglucemia.mp3');
```

## Notas Importantes

- ⚠️ NO modificar el contenido del JSON en `educationalContent.ts`
- ⚠️ NO cambiar el texto del botón "Deja que tu Tigo te lo explique"
- ⚠️ El nombre del hábito debe ser exacto para que funcione
- ✅ La funcionalidad está lista para MVP con audio simulado
- ✅ Fácil de actualizar a audio real cuando esté disponible
