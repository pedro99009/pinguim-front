const API_BASE_URL = "http://localhost:3001/api"

export async function getTeamsByDivison(division: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/teams?division=${encodeURIComponent(division)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Team");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTeamByDivision:", error);
    throw error;
  }
}

export async function getTeamsById(teamId: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/teamsById?teamId=${encodeURIComponent(teamId)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch team");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTeamById:", error);
    throw error;
  }
}

export async function getClassification(conference: 'East' | 'West' | 'Overall', season: string) {
  try {
    // Inclui o query string ?conference=East ou ?conference=West
    const response = await fetch(
      `${API_BASE_URL}/classification?conference=${encodeURIComponent(conference)}&season=${encodeURIComponent(season)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch classification');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getClassification:', error);
    throw error;
  }
}

// src/services/api.ts

export async function getPlayersByTeam (teamId: string) {
  const response = await fetch(
    `${API_BASE_URL}/playerByTeam?teamId=${encodeURIComponent(teamId)}`
);
  if (!response.ok) {
    throw new Error("Erro ao buscar jogadores do time");
  }

  const data = await response.json();
  return data;
};

export async function getPlayersById(playerId: string) {
  const response = await fetch(
    `${API_BASE_URL}/playerById?playerId=${playerId}`
);
  if (!response.ok) {
    throw new Error("Erro ao buscar jogadores do time");
  }

  const data = await response.json();
  return data;
};

export async function getPlayerCareerStats(playerId: string) {
  const response = await fetch (`${API_BASE_URL}/playerCareerStats?playerId=${playerId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar jogadores do time");
  }
  const data = await response.json();
  return data;
}

export async function getAllTeams() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/teams` // Sem parâmetros, retorna todos os times
    );
    if (!response.ok) {
      throw new Error("Failed to fetch all teams");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllTeams:", error);
    throw error;
  } 
}

export async function getAllPlayers(season?: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/allPlayers?season=${encodeURIComponent(season || "2024-25")}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch player list");
    }
    const data = await response.json();
    return data; // Espera-se que data.resultSets[0].rowSet e data.resultSets[0].headers existam
  } catch (error) {
    console.error("Error in getAllPlayers:", error);
    throw error;
  }
}
// Dados totais 
export async function getTeamAverageStats(season: string, perMode: string = 'PerGame') {
  try {
    const response = await fetch(
      `${API_BASE_URL}/teamStats?season=${encodeURIComponent(season)}&PerMode=${encodeURIComponent(perMode)}&MeasureType=Base`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch team average stats");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTeamAverageStats:", error);
    throw error;
  }
}

export async function getTeamEfficiencyStats(season: string, perMode: string = 'Per100Possessions') {
  try {
    const response = await fetch(
      `${API_BASE_URL}/teamStats?season=${encodeURIComponent(season)}&PerMode=${encodeURIComponent(perMode)}&MeasureType=Advanced`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch team efficiency stats");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTeamEfficiencyStats:", error);
    throw error;
  }
}
