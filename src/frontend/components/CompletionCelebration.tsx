import { useEffect, useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";

interface CompletionCelebrationProps {
  show: boolean;
  onComplete: () => void;
}

const MESSAGES = [
  "¡Buen trabajo!",
  "¡Excelente! 🎉",
  "Seguimos avanzando 💪",
  "¡Lo lograste! ✨",
  "¡Muy bien! 🌟",
];

export const CompletionCelebration = ({ show, onComplete }: CompletionCelebrationProps) => {
  const [message] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Trigger animation
      setIsVisible(true);
      
      // Auto-hide after 1.8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Wait for fade-out animation before calling onComplete
        setTimeout(onComplete, 300);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Semi-transparent backdrop */}
      <div 
        className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`} 
      />
      
      {/* Celebration card */}
      <div 
        className={`relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-6 flex flex-col items-center gap-3 transition-all duration-300 ${
          isVisible 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-90 translate-y-4"
        }`}
        style={{ marginBottom: "10vh" }} // Slightly above center
      >
        {/* Icon with subtle animation */}
        <div className="relative">
          <CheckCircle 
            className={`h-16 w-16 text-green-500 transition-all duration-500 ${
              isVisible ? "scale-100 rotate-0" : "scale-0 rotate-45"
            }`}
            strokeWidth={2}
          />
          {/* Sparkle effect */}
          <Sparkles 
            className={`absolute -top-1 -right-1 h-6 w-6 text-yellow-400 transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>
        
        {/* Message */}
        <p 
          className={`text-xl font-semibold text-gray-800 transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {message}
        </p>
        
        {/* Subtle penguin emoji or decoration */}
        <span 
          className={`text-2xl transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          🐧
        </span>
      </div>
    </div>
  );
};
