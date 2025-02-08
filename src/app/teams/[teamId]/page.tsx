"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPlayersByTeam, getTeams } from "@/services/api"
import type { Player, Team } from "@/interfaces/api"

type SortableKeys = keyof Pick<Player, 
  'first_name' | 
  'position' | 
  'height' | 
  'weight' | 
  'draft_number' | 
  'draft_round' | 
  'draft_year' | 
  'country' | 
  'college'
>;

export default function TeamPage({ params }: { params: Promise<{ teamId: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [team, setTeam] = useState<Team | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys | '',
    direction: 'asc' | 'desc'
  }>({
    key: '',
    direction: 'asc'
  });

  const sortPlayers = (key: SortableKeys) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedPlayers = [...players].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Para valores numéricos
      return direction === 'asc' 
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });

    setPlayers(sortedPlayers);
  };

  const SortableHeader = ({ children, sortKey }: { children: React.ReactNode, sortKey: SortableKeys }) => (
    <th 
      className="border p-2 cursor-pointer hover:bg-gray-200" 
      onClick={() => sortPlayers(sortKey)}
    >
      <div className="flex items-center justify-between">
        {children}
        {sortConfig.key === sortKey && (
          <span className="ml-2">
            {sortConfig.direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );


  useEffect(() => {
    async function fetchData() {
      try {
        const teamsResponse = await getTeams()
        const allTeams: Team[] = Array.isArray(teamsResponse.data) ? teamsResponse.data : []
        const selectedTeam = allTeams.find((t) => t.id.toString() === resolvedParams.teamId)

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
  }, [resolvedParams.teamId])

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
              <SortableHeader sortKey="first_name">Player</SortableHeader>
              <SortableHeader sortKey="position">Pos</SortableHeader>
              <SortableHeader sortKey="height">Height</SortableHeader>
              <SortableHeader sortKey="weight">Weight</SortableHeader>
              <SortableHeader sortKey="draft_number">Draft Number</SortableHeader>
              <SortableHeader sortKey="draft_round">Draft Round</SortableHeader>
              <SortableHeader sortKey="draft_year">Draft Year</SortableHeader>
              <SortableHeader sortKey="country">Country</SortableHeader>
              <SortableHeader sortKey="college">College</SortableHeader>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="border p-2">{player.first_name} {player.last_name}</td>
                <td className="border p-2">{player.position || "-"}</td>
                <td className="border p-2">{player.height || "-"}</td>
                <td className="border p-2">{player.weight || "-"}</td>
                <td className="border p-2">{player.draft_number || "-"}</td>
                <td className="border p-2">{player.draft_round || "-"}</td>
                <td className="border p-2">{player.draft_year || "-"}</td>
                <td className="border p-2">{player.country || "-"}</td>
                <td className="border p-2">{player.college || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
