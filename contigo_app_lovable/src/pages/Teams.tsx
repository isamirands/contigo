import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const TEAM_MEMBERS = [
  { id: 1, name: "María García", initials: "MG", steps: 15, color: "bg-primary" },
  { id: 2, name: "Carlos López", initials: "CL", steps: 12, color: "bg-secondary" },
  { id: 3, name: "Tú", initials: "TÚ", steps: 10, color: "bg-accent" },
  { id: 4, name: "Ana Martínez", initials: "AM", steps: 8, color: "bg-success" },
];

const Teams = () => {
  const totalTeamSteps = TEAM_MEMBERS.reduce((sum, member) => sum + member.steps, 0);
  const avgSteps = Math.round(totalTeamSteps / TEAM_MEMBERS.length);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Mi Equipo</h1>
          <p className="text-sm text-muted-foreground mt-1">Juntos somos más fuertes</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Team Overview */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Familia Contigo</h2>
              <p className="text-sm text-muted-foreground">{TEAM_MEMBERS.length} miembros</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Pasos totales del equipo</span>
              <span className="text-2xl font-bold text-primary">{totalTeamSteps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Promedio por persona</span>
              <span className="text-lg font-semibold">{avgSteps}</span>
            </div>
          </div>
        </Card>

        {/* Team Members */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Miembros</h2>
            <Button size="lg" className="h-12 gap-2">
              <Plus className="h-5 w-5" />
              Invitar
            </Button>
          </div>

          <div className="space-y-4">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.id} className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className={`h-14 w-14 ${member.color} flex-shrink-0`}>
                    <AvatarFallback className="text-white font-semibold text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pasos esta semana</span>
                        <span className="font-medium text-primary">{member.steps}</span>
                      </div>
                      <Progress value={(member.steps / 20) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Benefits */}
        <Card className="p-6 bg-accent/20 border-accent">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Beneficios del equipo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cuando cualquier miembro del equipo completa una actividad, 
                <span className="font-medium text-foreground"> todos los pingüinos Tigo avanzan juntos</span>. 
                ¡Motívense mutuamente y celebren cada victoria en equipo!
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Teams;
