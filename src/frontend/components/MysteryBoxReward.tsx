import { useState } from "react";
import { Gift, Copy, Sparkles, X } from "lucide-react";
import { Card } from "@/frontend/components/ui/card";
import { toast } from "sonner";

interface MysteryBoxRewardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaimed: () => void;
}

type RewardType = "cosmetic" | "cuidafarma";

interface CosmeticReward {
  type: "cosmetic";
  name: string;
  emoji: string;
  description: string;
}

interface CuidaFarmaReward {
  type: "cuidafarma";
  discount: string;
  code: string;
  description: string;
}

type Reward = CosmeticReward | CuidaFarmaReward;

// Available cosmetic rewards
const COSMETIC_REWARDS: CosmeticReward[] = [
  { type: "cosmetic", name: "Gorro navideño", emoji: "🎅", description: "Un gorro festivo para Tigo" },
  { type: "cosmetic", name: "Bufanda", emoji: "🧣", description: "Una bufanda abrigadora" },
  { type: "cosmetic", name: "Gafas de sol", emoji: "🕶️", description: "Gafas cool para Tigo" },
  { type: "cosmetic", name: "Corona", emoji: "👑", description: "Una corona real" },
  { type: "cosmetic", name: "Sombrero", emoji: "🎩", description: "Un elegante sombrero" },
];

// Available CuidaFarma discounts
const CUIDAFARMA_REWARDS: CuidaFarmaReward[] = [
  { type: "cuidafarma", discount: "10%", code: "CONTIGO10", description: "Descuento en CuidaFarma" },
  { type: "cuidafarma", discount: "15%", code: "CONTIGO15", description: "Descuento en CuidaFarma" },
  { type: "cuidafarma", discount: "20%", code: "CONTIGO20", description: "Descuento en CuidaFarma" },
];

export const MysteryBoxReward = ({ open, onOpenChange, onClaimed }: MysteryBoxRewardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);

  const handleOpen = () => {
    // Randomly choose reward type
    const rewardType: RewardType = Math.random() < 0.5 ? "cosmetic" : "cuidafarma";
    
    let selectedReward: Reward;
    if (rewardType === "cosmetic") {
      selectedReward = COSMETIC_REWARDS[Math.floor(Math.random() * COSMETIC_REWARDS.length)];
    } else {
      selectedReward = CUIDAFARMA_REWARDS[Math.floor(Math.random() * CUIDAFARMA_REWARDS.length)];
    }
    
    setReward(selectedReward);
    setIsRevealed(true);
  };

  const handleCopyCode = () => {
    if (reward && reward.type === "cuidafarma") {
      navigator.clipboard.writeText(reward.code);
      toast.success("Código copiado", {
        description: "Usa este código en CuidaFarma",
      });
    }
  };

  const handleClose = () => {
    setIsRevealed(false);
    setReward(null);
    onOpenChange(false);
    onClaimed();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => !isRevealed && onOpenChange(false)}
      />
      
      {/* Modal Content */}
      <Card className="relative z-10 w-full max-w-sm animate-in zoom-in-95 duration-300">
        {!isRevealed ? (
          // Mystery Box - Before Opening
          <div className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Gift className="h-20 w-20 text-primary animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-bounce" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">¡Mystery Box para Tigo!</h2>
            <p className="text-muted-foreground mb-6">
              Has completado todos tus hábitos de hoy 🎉
            </p>
            
            <button
              onClick={handleOpen}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Abrir
            </button>
            
            <button
              onClick={() => onOpenChange(false)}
              className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Abrir más tarde
            </button>
          </div>
        ) : (
          // Reward Revealed
          <div className="p-6">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  {reward?.type === "cosmetic" ? (
                    <div className="text-7xl animate-in zoom-in duration-500">
                      {reward.emoji}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-full p-6 animate-in zoom-in duration-500">
                      <Gift className="h-16 w-16 text-primary" />
                    </div>
                  )}
                  <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500 animate-bounce" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {reward?.type === "cosmetic" ? "¡Nuevo accesorio!" : "¡Descuento especial!"}
              </h2>
              
              {reward?.type === "cosmetic" ? (
                <>
                  <p className="text-xl font-semibold text-primary mb-1">
                    {reward.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reward.description}
                  </p>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Este accesorio se ha añadido a tu colección de Tigo
                    </p>
                  </div>
                </>
              ) : reward?.type === "cuidafarma" ? (
                <>
                  <p className="text-xl font-semibold text-primary mb-1">
                    {reward.discount} de descuento
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {reward.description}
                  </p>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Código de descuento:</p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="text-2xl font-bold tracking-wider">
                        {reward.code}
                      </code>
                      <button
                        onClick={handleCopyCode}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        aria-label="Copiar código"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Usa este código en la app CuidaFarma
                  </p>
                </>
              ) : null}
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              ¡Genial!
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};
