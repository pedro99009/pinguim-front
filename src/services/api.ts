const API_BASE_URL = "http://localhost:3001/api"

export async function getTeams(division: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/teams?division=${encodeURIComponent(division)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch classification");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getClassification:", error);
    throw error;
  }
}

export async function getClassification(params?: Record<string, string | number>) {
  try {
    const response = await fetch(`${API_BASE_URL}/classification`);
    if (!response.ok) {
      throw new Error("Failed to fetch classification");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getClassification:", error);
    throw error;
  }
}




