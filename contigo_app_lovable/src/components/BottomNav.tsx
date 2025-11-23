import { NavLink } from "@/components/NavLink";
import { Home, Compass, UsersRound, BarChart3, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnHome = location.pathname === "/";

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isOnHome) {
      e.preventDefault();
      navigate("/new-habit");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-pb">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
        <NavLink
          to="/"
          end
          onClick={handleHomeClick}
          className="flex items-center justify-center flex-1 p-3 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          {isOnHome ? (
            <Plus className="h-7 w-7" strokeWidth={2.5} />
          ) : (
            <Home className="h-7 w-7" />
          )}
        </NavLink>
        
        <NavLink
          to="/journey"
          className="flex items-center justify-center flex-1 p-3 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <Compass className="h-7 w-7" />
        </NavLink>
        
        <NavLink
          to="/teams"
          className="flex items-center justify-center flex-1 p-3 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <UsersRound className="h-7 w-7" />
        </NavLink>
        
        <NavLink
          to="/metrics"
          className="flex items-center justify-center flex-1 p-3 rounded-lg transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          <BarChart3 className="h-7 w-7" />
        </NavLink>
      </div>
    </nav>
  );
};
//holi