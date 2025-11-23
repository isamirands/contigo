// Single source of truth for team data across the app
// Used by: Home (Tigo journey), Mi equipo, and Scoreboard

export interface Team {
  id: string;
  name: string;
  countryCode: string;
  countryFlag: string;
  countryName: string;
  weeklySteps: number;
  monthlySteps: number;
  totalSteps: number;
  isCurrentUserTeam: boolean;
}

// Current user's team - MUST have exactly 122 steps
export const CURRENT_USER_TEAM: Team = {
  id: "team1",
  name: "Familia Contigo",
  countryCode: "PE",
  countryFlag: "🇵🇪",
  countryName: "Perú",
  weeklySteps: 122,
  monthlySteps: 122,
  totalSteps: 122,
  isCurrentUserTeam: true,
};

// Other teams - dummy data with steps between 0-400
export const OTHER_TEAMS: Team[] = [
  {
    id: "team2",
    name: "Los Guerreros",
    countryCode: "MX",
    countryFlag: "🇲🇽",
    countryName: "México",
    weeklySteps: 310,
    monthlySteps: 380,
    totalSteps: 450,
    isCurrentUserTeam: false,
  },
  {
    id: "team3",
    name: "Equipo Salud",
    countryCode: "CO",
    countryFlag: "🇨🇴",
    countryName: "Colombia",
    weeklySteps: 240,
    monthlySteps: 360,
    totalSteps: 520,
    isCurrentUserTeam: false,
  },
  {
    id: "team4",
    name: "Juntos Avanzamos",
    countryCode: "CL",
    countryFlag: "🇨🇱",
    countryName: "Chile",
    weeklySteps: 180,
    monthlySteps: 290,
    totalSteps: 410,
    isCurrentUserTeam: false,
  },
  {
    id: "team5",
    name: "Familia Fuerte",
    countryCode: "AR",
    countryFlag: "🇦🇷",
    countryName: "Argentina",
    weeklySteps: 90,
    monthlySteps: 220,
    totalSteps: 380,
    isCurrentUserTeam: false,
  },
  {
    id: "team6",
    name: "Unidos por la Salud",
    countryCode: "ES",
    countryFlag: "🇪🇸",
    countryName: "España",
    weeklySteps: 275,
    monthlySteps: 340,
    totalSteps: 490,
    isCurrentUserTeam: false,
  },
  {
    id: "team7",
    name: "Camino al Bienestar",
    countryCode: "EC",
    countryFlag: "🇪🇨",
    countryName: "Ecuador",
    weeklySteps: 65,
    monthlySteps: 180,
    totalSteps: 320,
    isCurrentUserTeam: false,
  },
  {
    id: "team8",
    name: "Equipo Esperanza",
    countryCode: "BO",
    countryFlag: "🇧🇴",
    countryName: "Bolivia",
    weeklySteps: 155,
    monthlySteps: 270,
    totalSteps: 395,
    isCurrentUserTeam: false,
  },
];

// All teams combined
export const ALL_TEAMS: Team[] = [CURRENT_USER_TEAM, ...OTHER_TEAMS];

// Helper to get current user's team
export const getCurrentUserTeam = (): Team => CURRENT_USER_TEAM;

// Helper to get total steps for current user's team (used by Home and Mi equipo)
export const getCurrentUserTeamTotalSteps = (): number => CURRENT_USER_TEAM.totalSteps;
