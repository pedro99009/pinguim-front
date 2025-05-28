export interface Team {
  LEAGUE_ID: number;
  TEAM_ID: string;
  MIN_YEAR: string;
  MAX_YEAR: string;
  ABBREVIATION: string;
};

export interface CommonTeamRoster {
  TEAM_ID: number;
  SEASON: string;
  PLAYER_ID: number;
  PLAYER: string;
  NICKNAME: string;
  NUM: string;
  POSITION: string;
  HEIGHT: string;
  WEIGHT: string;
  BIRTH_DATE: string;
  AGE: number;
  EXP: string; // Anos de experiência ou "R" para rookie
  SCHOOL: string;
  PLAYER_SLUG: string;
}

export interface TeamInfoCommon {
  TEAM_ID: number;
  SEASON_YEAR: string;
  TEAM_CITY: string;
  TEAM_NAME: string;
  TEAM_ABBREVIATION: string;
  TEAM_CONFERENCE: string;
  TEAM_DIVISION: string;
  TEAM_CODE: string;
  TEAM_SLUG: string;
  W: number;               // Wins
  L: number;               // Losses
  PCT: number;             // Win percentage
  CONF_RANK: number;
  DIV_RANK: number;
  MIN_YEAR: string;
  MAX_YEAR: string;
}

export interface TeamStats {
  TEAM_ID: string;
  TEAM_ABBREVIATION: string;
  TEAM_NAME: string;
  GP: number;
  W: number;
  L: number;
  MIN: number;
  DIST_FEET: number;
  DIST_MILES: number;
  DIST_MILES_OFF: number;
  DIST_MILES_DEF: number;
  AVG_SPEED: number;
  AVG_SPEED_OFF: number;
  AVG_SPEED_DEF: number;
}

export interface PlayerIndex {
  PERSON_ID: number;
  PLAYER_LAST_NAME: string;
  PLAYER_FIRST_NAME: string;
  PLAYER_SLUG: string;
  TEAM_SLUG: string;
  TEAM_ID: string;
  TEAM_CITY: string;
  IS_DEFUNCT: number; // 0 ou 1 indicando se o time está extinto
  TEAM_NAME: string;
  TEAM_ABBREVIATION: string;
  JERSEY_NUMBER: string;
  POSITION: string;
  HEIGHT: string; // Ex: "6-6"
  WEIGHT: string; // Ex: "220"
  COLLEGE: string;
  COUNTRY: string;
  DRAFT_YEAR: string;
  DRAFT_ROUND: string;
  DRAFT_NUMBER: string;
  ROSTER_STATUS: string; // Ex: "Active"
  PTS: number;
  REB: number;
  AST: number;
  STATS_TIMEFRAME: string;
  FROM_YEAR: number;
  TO_YEAR: number;
}

export interface PlayerCareerStats {
  PLAYER_ID: number;
  SEASON_ID: string;
  LEAGUE_ID: string;
  TEAM_ID: number;
  TEAM_ABBREVIATION: string;
  PLAYER_AGE: number;
  GP: number; // Games Played
  GS: number; // Games Started
  MIN: number; // Minutes
  FGM: number; // Field Goals Made
  FGA: number; // Field Goals Attempted
  FG_PCT: number; // Field Goal Percentage
  FG3M: number; // 3-Point Field Goals Made
  FG3A: number; // 3-Point Field Goals Attempted
  FG3_PCT: number; // 3-Point Percentage
  FTM: number; // Free Throws Made
  FTA: number; // Free Throws Attempted
  FT_PCT: number; // Free Throw Percentage
  OREB: number; // Offensive Rebounds
  DREB: number; // Defensive Rebounds
  REB: number; // Total Rebounds
  AST: number; // Assists
  STL: number; // Steals
  BLK: number; // Blocks
  TOV: number; // Turnovers
  PF: number; // Personal Fouls
  PTS: number; // Points
}

export interface PlayerBasicInfo {
  PLAYER_ID: number;
  PLAYER_NAME: string;
  PLAYER_FIRST_NAME?: string;
  PLAYER_LAST_NAME?: string;
  PLAYER_AGE?: number;
  POSITION?: string;
  HEIGHT?: string;
  WEIGHT?: string;
  TEAM_ID?: number;
}


  
  
 
  