"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllTeams, getAllPlayers } from "@/services/api"
import type { TeamStats } from "@/interfaces/api"

// Ajuste a interface para refletir o JSON real de commonallplayers:
export interface PlayerIndex {
  PERSON_ID: number
  DISPLAY_FIRST_LAST: string
  ROSTERSTATUS: number
  FROM_YEAR: string
  TO_YEAR: string
  PLAYERCODE: string
  PLAYER_SLUG: string
  TEAM_ID: number
  TEAM_CITY: string
  TEAM_NAME: string
  TEAM_ABBREVIATION: string
  TEAM_CODE: string | null
  TEAM_SLUG: string | null
  GAMES_PLAYED_FLAG: string
  OTHERLEAGUE_EXPERIENCE_CH: string
  // Se você não usar alguns desses campos, pode marcá-los como opcionais (?)
}

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teams, setTeams] = useState<TeamStats[]>([])
  const [players, setPlayers] = useState<PlayerIndex[]>([])
  const [filteredResults, setFilteredResults] = useState<(TeamStats | PlayerIndex)[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        // 1) Buscar todos os times
        const teamsData = await getAllTeams()
        const rowsTeams = teamsData.resultSets[0].rowSet as any[][]
        const headersTeams = teamsData.resultSets[0].headers as string[]
        const allTeams: TeamStats[] = rowsTeams.map((row) => {
          const obj: any = {}
          headersTeams.forEach((key, idx) => {
            obj[key] = row[idx]
          })
          return {
            TEAM_ID: obj.TEAM_ID,
            TEAM_ABBREVIATION: obj.TEAM_ABBREVIATION,
            TEAM_NAME: obj.TEAM_NAME,
            GP: obj.GP,
            W: obj.W,
            L: obj.L,
            MIN: obj.MIN,
            DIST_FEET: obj.DIST_FEET,
            DIST_MILES: obj.DIST_MILES,
            DIST_MILES_OFF: obj.DIST_MILES_OFF,
            DIST_MILES_DEF: obj.DIST_MILES_DEF,
            AVG_SPEED: obj.AVG_SPEED,
            AVG_SPEED_OFF: obj.AVG_SPEED_OFF,
            AVG_SPEED_DEF: obj.AVG_SPEED_DEF,
          }
        })
        setTeams(allTeams)

        // 2) Buscar todos os jogadores via getAllPlayers (commonallplayers)
        const playersData = await getAllPlayers() // padrão: "2024-25"
        const rowsPlayers = playersData.resultSets[0].rowSet as any[][]
        const headersPlayers = playersData.resultSets[0].headers as string[]
        const allPlayers: PlayerIndex[] = rowsPlayers.map((row) => {
          const obj: any = {}
          headersPlayers.forEach((key, idx) => {
            obj[key] = row[idx]
          })
          return {
            PERSON_ID: obj.PERSON_ID,
            DISPLAY_FIRST_LAST: obj.DISPLAY_FIRST_LAST,
            ROSTERSTATUS: obj.ROSTERSTATUS,
            FROM_YEAR: obj.FROM_YEAR,
            TO_YEAR: obj.TO_YEAR,
            PLAYERCODE: obj.PLAYERCODE,
            PLAYER_SLUG: obj.PLAYER_SLUG,
            TEAM_ID: obj.TEAM_ID,
            TEAM_CITY: obj.TEAM_CITY,
            TEAM_NAME: obj.TEAM_NAME,
            TEAM_ABBREVIATION: obj.TEAM_ABBREVIATION,
            TEAM_CODE: obj.TEAM_CODE,
            TEAM_SLUG: obj.TEAM_SLUG,
            GAMES_PLAYED_FLAG: obj.GAMES_PLAYED_FLAG,
            OTHERLEAGUE_EXPERIENCE_CH: obj.OTHERLEAGUE_EXPERIENCE_CH,
          }
        })
        setPlayers(allPlayers)
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

    // Filtra times por nome ou abreviação
    const filteredTeams = teams.filter((team) =>
      team.TEAM_ABBREVIATION.toLowerCase().includes(lowerCaseSearch) ||
      team.TEAM_NAME.toLowerCase().includes(lowerCaseSearch)
    )

    // Filtra jogadores por DISPLAY_FIRST_LAST (nome completo)
    const filteredPlayers = players.filter((player) =>
      player.DISPLAY_FIRST_LAST.toLowerCase().includes(lowerCaseSearch)
    )

    setFilteredResults([...filteredTeams, ...filteredPlayers])
  }, [searchTerm, teams, players])

  const handleSelect = (item: TeamStats | PlayerIndex) => {
    // Usa "GP" para distinguir TeamStats de PlayerIndex
    if ("GP" in item) {
      router.push(`/team/${item.TEAM_ID}`)
    } else {
      router.push(`/team/${item.TEAM_ID}/player/${item.PERSON_ID}`)
    }
    setSearchTerm("")
    setFilteredResults([])
  }

  return (
    <div className="relative w-full max-w-md mx-auto my-4 text-black">
      <input
        type="text"
        placeholder="Search for teams or players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      {filteredResults.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto text-black">
          {filteredResults.map((item) => (
            <li
              key={
                // Se “GP” existe, é TeamStats; senão, é PlayerIndex
                "GP" in item
                  ? item.TEAM_ID
                  : `${item.PERSON_ID}-player`
              }
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {"GP" in item
                ? `🏀 ${item.TEAM_NAME}`
                : `👤 ${item.DISPLAY_FIRST_LAST}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
