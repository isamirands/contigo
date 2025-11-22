import { NavLink } from "@/components/NavLink";
import { Home, Map, Users, Settings } from "lucide-react";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-pb">
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-2">
        <NavLink
          to="/"
          end
          className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <Home className="h-7 w-7" />
          <span className="text-xs font-medium">Inicio</span>
        </NavLink>
        
        <NavLink
          to="/journey"
          className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <Map className="h-7 w-7" />
          <span className="text-xs font-medium">Viaje</span>
        </NavLink>
        
        <NavLink
          to="/teams"
          className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <Users className="h-7 w-7" />
          <span className="text-xs font-medium">Equipos</span>
        </NavLink>
        
        <NavLink
          to="/settings"
          className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <Settings className="h-7 w-7" />
          <span className="text-xs font-medium">Ajustes</span>
        </NavLink>
      </div>
    </nav>
  );
};
