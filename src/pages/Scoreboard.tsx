import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Users } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { ALL_TEAMS, Team } from "@/data/teamsData";

type Period = "week" | "month";

const Scoreboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("week");

  // Sort teams based on selected period
  const sortedTeams = [...ALL_TEAMS].sort((a, b) => {
    if (selectedPeriod === "week") {
      return b.weeklySteps - a.weeklySteps;
    }
    return b.monthlySteps - a.monthlySteps;
  });

  const getStepsForPeriod = (team: Team) => {
    return selectedPeriod === "week" ? team.weeklySteps : team.monthlySteps;
  };

  const getPeriodLabel = () => {
    return selectedPeriod === "week" ? "esta semana" : "este mes";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/teams")}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">Scoreboard de equipos</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Period Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setSelectedPeriod("week")}
          >
            Esta semana
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setSelectedPeriod("month")}
          >
            Último mes
          </Button>
        </div>

        {/* Scoreboard List */}
        <div className="space-y-3">
          {sortedTeams.map((team, index) => {
            const rank = index + 1;
            const steps = getStepsForPeriod(team);
            const isTopThree = rank <= 3;

            return (
              <Card
                key={team.id}
                className={`p-4 ${
                  team.isCurrentUserTeam
                    ? "bg-primary/5 border-primary/30"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex flex-col items-center">
                    {isTopThree && rank === 1 && (
                      <Trophy className="h-6 w-6 text-yellow-500 mb-1" />
                    )}
                    {isTopThree && rank === 2 && (
                      <Trophy className="h-6 w-6 text-gray-400 mb-1" />
                    )}
                    {isTopThree && rank === 3 && (
                      <Trophy className="h-6 w-6 text-amber-700 mb-1" />
                    )}
                    <span
                      className={`text-2xl font-bold ${
                        isTopThree ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      #{rank}
                    </span>
                  </div>

                  {/* Team Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {/* Team avatar */}
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-base truncate ${
                            team.isCurrentUserTeam ? "text-primary" : ""
                          }`}
                        >
                          {team.name}
                          {team.isCurrentUserTeam && (
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              (Tu equipo)
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground">
                        Pasos {getPeriodLabel()}:{" "}
                        <span className="font-semibold text-foreground">
                          {steps.toLocaleString("es-ES")}
                        </span>
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span>Caminando por</span>
                      <span className="text-base">{team.countryFlag}</span>
                      <span className="font-medium">{team.countryName}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Scoreboard;
