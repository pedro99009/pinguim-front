"use client"

import { useState, useEffect } from "react"
import { getTeams, getPlayersByTeam } from "@/services/api"
import { TeamCard } from "./components/team-card"
import { PlayerList } from "./components/player-list"
import type { Team, Player } from "@/types/api"

export default function Page() {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await getTeams()
        const teamsData = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : []
        setTeams(teamsData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching teams:", err)
        setError("Failed to load teams")
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  async function handleTeamSelect(team: Team) {
    setSelectedTeam(team)
    try {
      console.log("ID DO TIME:" , team.id);
      const response = await getPlayersByTeam(team.id)
      const playersData = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : []
      setPlayers(playersData)
    } catch (err) {
      console.error("Error fetching players:", err)
      setError("Failed to load players")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading teams...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">NBA Teams</h1>

      {teams.length === 0 ? (
        <div className="text-center text-muted-foreground">No teams found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onClick={handleTeamSelect}
                  isSelected={selectedTeam?.id === team.id}
                />
              ))}
            </div>
          </div>
          <div>
            {selectedTeam && players.length > 0 && <PlayerList players={players} teamName={selectedTeam.full_name} />}
            {selectedTeam && players.length === 0 && (
              <div className="text-center text-muted-foreground">No players found for {selectedTeam.full_name}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

