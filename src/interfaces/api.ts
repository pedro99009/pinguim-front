export interface Team {
  LEAGUE_ID: number;
  TEAM_ID: string;
  MIN_YEAR: string;
  MAX_YEAR: string;
  ABBREVIATION: string;
};

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


  
  
 
  