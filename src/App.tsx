import { Toaster } from "@/frontend/components/ui/toaster";
import { Toaster as Sonner } from "@/frontend/components/ui/sonner";
import { TooltipProvider } from "@/frontend/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/frontend/pages/Home";
import Journey from "@/frontend/pages/Journey";
import GlobalJourney from "@/frontend/pages/GlobalJourney";
import NewHabit from "@/frontend/pages/NewHabit";
import Metrics from "@/frontend/pages/Metrics";
import ExplorarForos from "@/frontend/pages/ExplorarForos";
import PostDetail from "@/frontend/pages/PostDetail";
import Teams from "@/frontend/pages/Teams";
import Scoreboard from "@/frontend/pages/Scoreboard";
import Settings from "@/frontend/pages/Settings";
import NotFound from "@/frontend/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/global-journey" element={<GlobalJourney />} />
          <Route path="/new-habit" element={<NewHabit />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/explorar-foros" element={<ExplorarForos />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
