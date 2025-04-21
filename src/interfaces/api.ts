export interface Team {
  LEAGUE_ID: number;
  TEAM_ID: number;
  MIN_YEAR: string;
  MAX_YEAR: string;
  ABBREVIATION: string;
};

export interface TeamStats {
  TEAM_ID: number;
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

  
  
 
  