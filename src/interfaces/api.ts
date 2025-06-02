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
  BIRTHDATE: number;
    
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

export interface TeamAdvancedStats  {
  TEAM_ID: number;
  TEAM_NAME: string;
  GP: number; // Jogos disputados
  W: number; // Vitórias
  L: number; // Derrotas
  W_PCT: number; // Porcentagem de vitórias
  MIN: number; // Minutos jogados
  PTS: number; // Pontos por jogo
  FGM: number; // Arremessos de quadra convertidos
  FGA: number; // Arremessos de quadra tentados
  FG_PCT: number; // Porcentagem de arremessos de quadra
  FG3M: number; // Arremessos de 3 pontos convertidos
  FG3A: number; // Arremessos de 3 pontos tentados
  FG3_PCT: number; // Porcentagem de arremessos de 3 pontos
  FTM: number; // Lances livres convertidos
  FTA: number; // Lances livres tentados
  FT_PCT: number; // Porcentagem de lances livres
  OREB: number; // Rebotes ofensivos
  DREB: number; // Rebotes defensivos
  REB: number; // Rebotes totais
  AST: number; // Assistências
  TOV: number; // Turnovers
  STL: number; // Roubos de bola
  BLK: number; // Tocos
  BLKA: number; // Tocos sofridos
  PF: number; // Faltas pessoais
  PFD: number; // Faltas recebidas
  // Dados com ? são dados que veem apenas quando o perMode é advenced
  PLUS_MINUS: number; // Saldo de pontos
  OFF_RATING?: number; // Eficiência ofensiva
  DEF_RATING?: number; // Eficiência defensiva
  NET_RATING?: number; // Eficiência líquida
  AST_PCT?: number; // Porcentagem de assistências
  AST_TO?: number; // Assistências por turnover
  AST_RATIO?: number; // Taxa de assistências
  OREB_PCT?: number; // Porcentagem de rebotes ofensivos
  DREB_PCT?: number; // Porcentagem de rebotes defensivos
  REB_PCT?: number; // Porcentagem de rebotes totais
  TM_TOV_PCT?: number; // Porcentagem de turnovers do time
  EFG_PCT?: number; // Porcentagem efetiva de arremessos de quadra
  TS_PCT?: number; // Porcentagem de arremessos verdadeiros
  PACE?: number; // Ritmo de jogo
  PIE?: number; // Índice de eficiência do jogador
}  