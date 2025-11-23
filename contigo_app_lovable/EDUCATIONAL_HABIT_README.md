# Funcionalidad de Hábito Educativo

## Descripción

Se ha implementado un comportamiento especial para el hábito **"Leer artículo educativo: Hipoglucemia e hiperglucemia"**.

## Comportamiento

### Hábito Educativo Específico
- **Nombre exacto**: "Leer artículo educativo: Hipoglucemia e hiperglucemia"
- **Comportamiento al hacer tap**: NO se marca como completado directamente
- En su lugar, se abre un modal educativo con contenido en slides

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

4. **Cierre del modal**
   - Si se cierra el modal, el audio se detiene automáticamente
   - El progreso se reinicia

5. **Completar el hábito**
   - El hábito se marca como completado cuando el audio termina
   - También se puede completar manualmente después de revisar el contenido

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

## Próximos Pasos (Producción)

### Integrar Audio Real
1. Subir archivo de audio a `/public/audio/`
2. En `EducationalModal.tsx`, reemplazar la simulación:
   ```typescript
   audioRef.current = new Audio('/audio/hipoglucemia-hiperglucemia.mp3');
   ```
3. Usar `audioRef.current.currentTime` para sincronizar slides
4. Escuchar evento `timeupdate` del audio

### Ejemplo de Integración Real
```typescript
const handleStartAudio = () => {
  setAudioStarted(true);
  audioRef.current = new Audio('/audio/hipoglucemia-hiperglucemia.mp3');
  
  audioRef.current.addEventListener('timeupdate', () => {
    const currentTime = audioRef.current!.currentTime;
    
    const slideIndex = audioSync.findIndex(
      sync => currentTime >= sync.startAt && currentTime <= sync.endAt
    );
    
    if (slideIndex !== -1 && slideIndex !== currentSlideIndex) {
      setCurrentSlideIndex(slideIndex);
    }
  });
  
  audioRef.current.addEventListener('ended', () => {
    stopAudio();
    onComplete();
  });
  
  audioRef.current.play();
  setIsPlaying(true);
};
```

## Notas Importantes

- ⚠️ NO modificar el contenido del JSON en `educationalContent.ts`
- ⚠️ NO cambiar el texto del botón "Deja que tu Tigo te lo explique"
- ⚠️ El nombre del hábito debe ser exacto para que funcione
- ✅ La funcionalidad está lista para MVP con audio simulado
- ✅ Fácil de actualizar a audio real cuando esté disponible
