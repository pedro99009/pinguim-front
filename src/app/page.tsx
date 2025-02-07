"use client"

import { useState, useEffect } from "react"
import { getTeams } from "@/services/api"
import { TeamCard } from "./components/team-card"
import type { Team } from "@/interfaces/api"
import { Divisions } from "./constants/enum-divisions.const"
import { DivisionCard } from "./components/division-card"

export default function Page() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await getTeams()
        const teamsData = Array.isArray(response.data) ? response.data : []
        setTeams(teamsData)
      } catch (err) {
        console.error("Error fetching teams:", err)
        setError("Failed to load teams")
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading teams...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  const teamsByDivision: Record<string, Team[]> = Object.values(Divisions).reduce((acc, division) => {
    acc[division] = teams.filter((team) => team.division === division)
    return acc
  }, {} as Record<string, Team[]>)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">NBA Teams by Division</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(teamsByDivision).map(([division, teams]) => (
          teams.length > 0 && <DivisionCard key={division} division={division} teams={teams} />
        ))}
      </div>
    </div>
  )
}
