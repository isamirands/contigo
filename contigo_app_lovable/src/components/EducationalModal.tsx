import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { EDUCATIONAL_CONTENT } from "@/data/educationalContent";

interface EducationalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EducationalModal = ({ open, onOpenChange }: EducationalModalProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = EDUCATIONAL_CONTENT.slides;
  const audioSync = EDUCATIONAL_CONTENT.audio.sync;
  const currentSlide = slides[currentSlideIndex];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Handle modal close
  useEffect(() => {
    if (!open) {
      stopAudio();
      setCurrentSlideIndex(0);
      setAudioStarted(false);
    }
  }, [open]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleStartAudio = () => {
    setAudioStarted(true);
    setIsPlaying(true);
    
    // Intentar cargar el audio real
    try {
      audioRef.current = new Audio('/audio/hipoglucemia-hiperglucemia.wav');
      
      // Evento cuando el audio se actualiza
      audioRef.current.addEventListener('timeupdate', () => {
        if (!audioRef.current) return;
        
        const currentTime = Math.floor(audioRef.current.currentTime);
        
        // Buscar el slide correspondiente según el tiempo actual
        const slideIndex = audioSync.findIndex(
          sync => currentTime >= sync.startAt && currentTime <= sync.endAt
        );
        
        if (slideIndex !== -1 && slideIndex !== currentSlideIndex) {
          setCurrentSlideIndex(slideIndex);
        }
      });
      
      // Evento cuando el audio termina
      audioRef.current.addEventListener('ended', () => {
        stopAudio();
      });
      
      // Evento de error (si el archivo no existe, usar simulación)
      audioRef.current.addEventListener('error', () => {
        console.warn('Audio file not found, using simulation');
        useFallbackSimulation();
      });
      
      // Reproducir el audio
      audioRef.current.play().catch(() => {
        // Si falla la reproducción, usar simulación
        useFallbackSimulation();
      });
      
    } catch (error) {
      // Si hay error, usar simulación
      console.warn('Error loading audio, using simulation');
      useFallbackSimulation();
    }
  };

  // Función de respaldo: simulación para MVP
  const useFallbackSimulation = () => {
    let currentTime = 0;
    
    timeUpdateIntervalRef.current = setInterval(() => {
      currentTime += 1;
      
      // Buscar el slide correspondiente según el tiempo actual
      const slideIndex = audioSync.findIndex(
        sync => currentTime >= sync.startAt && currentTime <= sync.endAt
      );
      
      if (slideIndex !== -1 && slideIndex !== currentSlideIndex) {
        setCurrentSlideIndex(slideIndex);
      }
      
      // Detener cuando termine el último slide
      if (currentTime > audioSync[audioSync.length - 1].endAt) {
        stopAudio();
      }
    }, 1000);
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleClose = () => {
    stopAudio();
    onOpenChange(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: 0, y: 0 });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    // Detectar dirección del gesto temprano
    if (touchStart.x && touchStart.y) {
      const deltaX = Math.abs(touch.clientX - touchStart.x);
      const deltaY = Math.abs(touch.clientY - touchStart.y);
      
      // Si el movimiento es claramente vertical, no prevenir el comportamiento por defecto
      // Esto permite que el scroll funcione
      if (deltaY > deltaX && deltaY > 10) {
        // Es un scroll vertical, no hacer nada
        return;
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = touchStart.y - touchEnd.y;
    
    const absHorizontal = Math.abs(horizontalDistance);
    const absVertical = Math.abs(verticalDistance);
    
    // Solo procesar como swipe si:
    // 1. El movimiento horizontal es significativo (> minSwipeDistance)
    // 2. El movimiento es MÁS horizontal que vertical
    // 3. El audio no está reproduciéndose
    const isHorizontalSwipe = absHorizontal > minSwipeDistance && absHorizontal > absVertical * 1.5;
    
    if (isHorizontalSwipe && !isPlaying) {
      const isLeftSwipe = horizontalDistance > 0;
      const isRightSwipe = horizontalDistance < 0;
      
      if (isLeftSwipe && currentSlideIndex < slides.length - 1) {
        goToNextSlide();
      }
      if (isRightSwipe && currentSlideIndex > 0) {
        goToPrevSlide();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[90vw] max-w-md h-[80vh] flex flex-col p-0 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header - Fijo arriba con padding reducido */}
        <DialogHeader className="px-4 pt-3 pb-2 flex-shrink-0 border-b bg-background">
          <DialogTitle className="text-sm font-bold text-primary leading-tight text-center">
            {EDUCATIONAL_CONTENT.habit_name}
          </DialogTitle>
        </DialogHeader>

        {/* Área principal - Contiene la card y los indicadores con padding reducido */}
        <div className="flex-1 overflow-hidden px-3 py-2 flex flex-col bg-background">
          <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
            {/* Slide Card Container - Wrapper para swipe */}
            <div 
              className="bg-white rounded-3xl shadow-lg flex-1 flex flex-col overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Contenido scrollable DENTRO de la card - SIN eventos touch */}
              <div 
                className="overflow-y-scroll flex-1 p-4"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
              >
                <div className="space-y-4">
                  {/* Título y subtítulo centrados */}
                  <div className="text-center space-y-2">
                    <h3 className="text-base font-bold text-primary leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  {/* Bullets - bloque centrado, texto alineado a la izquierda */}
                  <div className="mx-auto max-w-[280px]">
                    <ul className="space-y-2">
                      {currentSlide.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-bold text-xs mt-0.5 flex-shrink-0">•</span>
                          <span className="text-xs leading-relaxed text-left">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nota */}
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-lg">
                    <p className="text-xs text-amber-900 leading-relaxed">
                      <strong>Nota:</strong> {currentSlide.note}
                    </p>
                  </div>

                  {/* Padding extra al final para que no quede pegado */}
                  <div className="h-4"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Audio Control Button - Fijo abajo, fuera del scroll con padding reducido */}
        <div className="flex-shrink-0 px-4 pb-3 pt-2 border-t bg-background space-y-2">
          {/* Slide dots indicator - Encima del botón con padding reducido */}
          <div className="flex justify-center gap-1.5 py-0.5">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlideIndex 
                    ? 'w-6 bg-primary' 
                    : 'w-1.5 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Swipe indicator */}
          {!isPlaying && (
            <div className="text-center text-[10px] text-muted-foreground italic">
              💡 Desliza para cambiar de slide
            </div>
          )}

          {/* Botón de audio con altura optimizada */}
          {!audioStarted ? (
            <Button
              size="lg"
              className="w-full h-12 text-sm font-semibold"
              onClick={handleStartAudio}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Deja que tu Tigo te lo explique
            </Button>
          ) : (
            <div className="text-center py-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Volume2 className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">
                  {isPlaying ? "Reproduciendo..." : "Audio finalizado"}
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
