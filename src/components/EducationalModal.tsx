import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { EDUCATIONAL_CONTENT } from "@/data/educationalContent";
import tigoProfile from "@/assets/tigo-profile-blue-penguin.png";

interface EducationalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const EducationalModal = ({ open, onOpenChange, onConfirm }: EducationalModalProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
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

  // Handle modal close - reset all states
  useEffect(() => {
    if (!open) {
      stopAudio();
      setCurrentSlideIndex(0);
      setAudioStarted(false);
      setAudioCompleted(false);
      setAudioCurrentTime(0);
      setAudioDuration(0);
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
      
      // Evento cuando se carga la metadata (duración)
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setAudioDuration(audioRef.current.duration);
        }
      });
      
      // Evento cuando el audio se actualiza
      audioRef.current.addEventListener('timeupdate', () => {
        if (!audioRef.current) return;
        
        const currentTime = audioRef.current.currentTime;
        setAudioCurrentTime(currentTime);
        
        // Buscar el slide correspondiente según el tiempo actual
        const slideIndex = audioSync.findIndex(
          sync => currentTime >= sync.startAt && currentTime <= sync.endAt
        );
        
        if (slideIndex !== -1 && slideIndex !== currentSlideIndex) {
          setCurrentSlideIndex(slideIndex);
        }
      });
      
      // Evento cuando el audio termina - HABILITA EL BOTÓN
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setAudioCompleted(true); // ✅ Habilita el botón de confirmación
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
    const totalDuration = audioSync[audioSync.length - 1].endAt;
    setAudioDuration(totalDuration);
    
    timeUpdateIntervalRef.current = setInterval(() => {
      currentTime += 1;
      setAudioCurrentTime(currentTime);
      
      // Buscar el slide correspondiente según el tiempo actual
      const slideIndex = audioSync.findIndex(
        sync => currentTime >= sync.startAt && currentTime <= sync.endAt
      );
      
      if (slideIndex !== -1 && slideIndex !== currentSlideIndex) {
        setCurrentSlideIndex(slideIndex);
      }
      
      // Detener cuando termine el último slide
      if (currentTime > audioSync[audioSync.length - 1].endAt) {
        setIsPlaying(false);
        setAudioCompleted(true); // ✅ Habilita el botón de confirmación
        if (timeUpdateIntervalRef.current) {
          clearInterval(timeUpdateIntervalRef.current);
        }
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

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setAudioCurrentTime(newTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    onConfirm();
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

        {/* Área de controles - Fijo abajo */}
        <div className="flex-shrink-0 px-4 pb-3 pt-2 border-t bg-background space-y-3">
          {/* Slide dots indicator */}
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



          {/* Tigo Flotante con Diálogo */}
          {!audioStarted ? (
            <div className="flex items-end gap-3 justify-center">
              {/* Speech Bubble */}
              <div className="relative bg-primary text-primary-foreground rounded-2xl px-4 py-2 shadow-md">
                <div className="text-xs font-medium whitespace-nowrap">
                  ¿Lo leo contigo?
                </div>
                {/* Triangle pointer */}
                <div className="absolute -right-2 bottom-3 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-primary border-b-[8px] border-b-transparent"></div>
              </div>
              
              {/* Tigo Avatar Clickeable */}
              <button
                onClick={handleStartAudio}
                className="relative flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
              >
                <img 
                  src={tigoProfile} 
                  alt="Tigo" 
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Tigo Avatar con Audio Player */}
              <div className="flex items-center gap-3">
                <img 
                  src={tigoProfile} 
                  alt="Tigo" 
                  className="h-12 w-12 object-contain flex-shrink-0"
                />
                
                <div className="flex-1 bg-muted/30 rounded-lg p-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 flex-shrink-0"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <span className="text-base">⏸</span>
                      ) : (
                        <span className="text-base">▶</span>
                      )}
                    </Button>
                    
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max={audioDuration || 100}
                        value={audioCurrentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(audioCurrentTime / audioDuration) * 100}%, #d1d5db ${(audioCurrentTime / audioDuration) * 100}%, #d1d5db 100%)`
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-[9px] text-muted-foreground px-1">
                    <span>{formatTime(audioCurrentTime)}</span>
                    <span>{formatTime(audioDuration)}</span>
                  </div>
                </div>
              </div>
              
              {audioCompleted && (
                <div className="text-center text-xs text-success font-medium">
                  ✓ Audio completado
                </div>
              )}
            </div>
          )}

          {/* Botón Principal - Completar */}
          <Button
            size="lg"
            className="w-full h-12 text-sm font-semibold"
            disabled={audioStarted ? !audioCompleted : currentSlideIndex !== slides.length - 1}
            onClick={handleConfirm}
          >
            ✓ Completar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
