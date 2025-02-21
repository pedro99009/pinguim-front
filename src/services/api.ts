const API_BASE_URL = "http://localhost:3001/api/nba"

export async function getTeams() {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`)
    if (!response.ok) {
      throw new Error("Failed to fetch teams")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in getTeams:", error)
    throw error
  }
}

export async function getPlayersByTeam(teamId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/players?team_ids[]=${teamId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch players")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in getPlayersByTeam:", error)
    throw error
  }
}

export async function getPlayers() {
  try {
    const response = await fetch(`${API_BASE_URL}/allPlayers`)
    if (!response.ok) {
      throw new Error("Failed to fetch players")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in getPlayersByTeam:", error)
    throw error
  }
}

export async function getPlayerById(playerId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/players?player_ids[]=${playerId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch player details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getPlayerById:", error);
    throw error;
  }
}
