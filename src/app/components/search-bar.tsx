"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getTeams, getPlayers } from "@/services/api"
import type { Team, Player } from "@/interfaces/api"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredResults, setFilteredResults] = useState<(Team | Player)[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        // Busca times e jogadores em paralelo
        const [teamsResponse, playersResponse] = await Promise.all([
          getTeams(),
          getPlayers()
        ])

        // Define os times
        const teamsData = teamsResponse.data || []
        setTeams(teamsData)

        // Define os jogadores
        const playersData = playersResponse.data || []
        setPlayers(playersData)
      } catch (error) {
        console.error("Error fetching teams or players:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([])
      return
    }

    const lowerCaseSearch = searchTerm.toLowerCase()
    
    // Verifica se teams é um array antes de filtrar
    const filteredTeams = Array.isArray(teams) 
      ? teams.filter(team =>
          team.full_name.toLowerCase().includes(lowerCaseSearch)
        )
      : []

    // Verifica se players é um array antes de filtrar
    const filteredPlayers = Array.isArray(players)
      ? players.filter(player =>
          `${player.first_name} ${player.last_name}`.toLowerCase().includes(lowerCaseSearch)
        )
      : []

    setFilteredResults([...filteredTeams, ...filteredPlayers])
  }, [searchTerm, teams, players])

  const handleSelect = (item: Team | Player) => {
    if ("full_name" in item) {
      router.push(`/teams/${item.id}`)
    } else {
      router.push(`/players/${item.id}`)
    }
    setSearchTerm("")
    setFilteredResults([])
  }

  return (
    <div className="relative w-full max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Search for teams or players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      {filteredResults.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {filteredResults.map((item) => (
            <li
              key={"full_name" in item ? item.id : `${item.id}-player`}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {"full_name" in item
                ? `🏀 ${item.full_name}`
                : `👤 ${item.first_name} ${item.last_name}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}