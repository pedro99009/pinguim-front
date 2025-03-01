export interface Team {
    id: number;
    conference: string;
    division: string;
    city: string;
    name: string;
    full_name: string;
    abbreviation: string;
  }
  
  export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: string;
    weight: string;
    jersey_number: string;
    college: string;
    country: string;
    draft_year: number;
    draft_round: number;
    draft_number: number;
    team: Team;
  }
  
  export interface PlayerStat {
    id: number;
    playerName: string;
    position: string;
    age: number;
    games: number;
    minutesPg: number;
    fieldGoals: number;
    fieldAttempts: number | null;
    fieldPercent: number | null;
    threeFg: number | null;
    threeAttempts: number;
    threePercent: number;
    twoFg: number;
    twoAttempts: number;
    twoPercent: number;
    effectFgPercent: number;
    ft: number | null;
    ftAttempts: number;
    ftPercent: number;
    offensiveRb: number;
    defensiveRb: number;
    totalRb: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    points: number;
    team: string;
    season: number;
    playerId: string;
  }
  