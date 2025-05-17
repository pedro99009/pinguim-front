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

export async function getClassification(conference: 'East' | 'West', season: string) {
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






