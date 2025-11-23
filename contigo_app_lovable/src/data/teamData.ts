// Shared team data - single source of truth for team members
// This ensures consistency between Home Tigo journey and Mi Equipo screen

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "user1", name: "Tú", role: "Paciente" },
  { id: "user2", name: "Ana", role: "Cuidador" },
];

export interface TeamInfo {
  name: string;
  description: string;
  treatmentTypes: string[];
}

export const TEAM_INFO: TeamInfo = {
  name: "Familia Contigo",
  description: "Juntos somos más fuertes en nuestro camino hacia el bienestar",
  treatmentTypes: ["Diabetes"],
};
