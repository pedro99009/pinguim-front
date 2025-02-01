"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPlayersByTeam, getTeams } from "@/services/api"
import type { Player, Team } from "@/types/api"

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const router = useRouter()
  const [team, setTeam] = useState<Team | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsResponse = await getTeams()
        const allTeams: Team[] = Array.isArray(teamsResponse.data) ? teamsResponse.data : []
        const selectedTeam = allTeams.find((t) => t.id.toString() === params.teamId)

        if (!selectedTeam) {
          setError("Team not found")
          return
        }

        setTeam(selectedTeam)

        const playersResponse = await getPlayersByTeam(selectedTeam.id)
        const playersData = Array.isArray(playersResponse.data) ? playersResponse.data : []

        setPlayers(playersData)
      } catch (err) {
        console.error("Error fetching team data:", err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.teamId])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading players...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <button onClick={() => router.push("/")} className="mb-4 text-blue-500 hover:underline">
        ← Back to teams
      </button>
      <h1 className="text-3xl font-bold mb-6">{team?.full_name} Roster</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Player</th>
              <th className="border p-2">Pos</th>
              <th className="border p-2">Height</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="border p-2">{player.first_name} {player.last_name}</td>
                <td className="border p-2">{player.position || "-"}</td>
                <td className="border p-2">{player.height_feet || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
