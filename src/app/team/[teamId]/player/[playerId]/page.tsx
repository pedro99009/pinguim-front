"use client"

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPlayerById, getTeams, getPlayerStatsByName } from "@/services/api";
import type { Player, Team } from "@/interfaces/api";
import type { PlayerStat } from "@/interfaces/api";
import Header from "@/app/components/Header";

export default function PlayerPage({ 
  params 
}: { 
  params: Promise<{ teamId: string; playerId: string }> 
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Busca dados básicos do jogador
        const playerResponse = await getPlayerById(resolvedParams.playerId);
        const playerData = playerResponse.data;
        console.log(playerData);
        if (!playerData) {
          setError("Player not found");
          return;
        }
        setPlayer(playerData[0]);
        console.log("Dados jogador", player);

        // Busca dados do time para exibir informações do mesmo
        const teamsResponse = await getTeams();
        const allTeams: Team[] = Array.isArray(teamsResponse.data) ? teamsResponse.data : [];
        const selectedTeam = allTeams.find((t) => t.id.toString() === resolvedParams.teamId);
        if (selectedTeam) {
          setTeam(selectedTeam);
          console.log(selectedTeam);
        }

        // Busca as estatísticas detalhadas usando a API do solar-meadow
        const fullName = `${playerData[0].first_name} ${playerData[0].last_name}`;
        console.log(" Nome do jogador: ",fullName);
        const statsResponse = await getPlayerStatsByName(fullName);
        console.log(" Nome do jogador: ",fullName);
        console.log(statsResponse);
        // statsResponse é esperado ser um array de PlayerStat
        setPlayerStats(statsResponse);

        // Define as temporadas disponíveis e seleciona, por padrão, a mais recente
        const seasons = Array.from(new Set(statsResponse.map((stat: PlayerStat) => stat.season))).sort((a, b) => b - a);
        if (seasons.length > 0) {
          setSelectedSeason(seasons[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [resolvedParams.playerId, resolvedParams.teamId]);

  if (loading) {
    console.log("Dados jogador", player);
    return <div className="flex items-center justify-center min-h-screen">Loading player details...</div>;
    
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!player) {
    return <div className="text-center">Player not found</div>;
  }

  // Filtra as estatísticas para a temporada selecionada
  const seasonStats = playerStats.filter(stat => stat.season === selectedSeason)[0];

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <button
          onClick={() => router.push(`/team/${resolvedParams.teamId}`)}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back to {team?.full_name || 'team'} roster
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6">
            {player.first_name} {player.last_name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Informações Pessoais</h2>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Posição:</span> {player.position || '-'}</p>
                  <p><span className="font-medium">Altura:</span> {player.height || '-'}</p>
                  <p><span className="font-medium">Peso:</span> {player.weight || '-'}</p>
                  <p><span className="font-medium">País:</span> {player.country || '-'}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Draft</h2>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Ano do Draft:</span> {player.draft_year || '-'}</p>
                  <p><span className="font-medium">Rodada:</span> {player.draft_round || '-'}</p>
                  <p><span className="font-medium">Número:</span> {player.draft_number || '-'}</p>
                  <p><span className="font-medium">College:</span> {player.college || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de estatísticas da temporada */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold mb-4">Estatísticas por Temporada</h2>

  {playerStats && playerStats.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Temporada
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jogos
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Minutos
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assistências
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              OF. Reb
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DEF. Reb
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Reb
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              %FT
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tent. 3PT
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Roubos
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {playerStats
            .sort((a, b) => b.season - a.season) // ordena da temporada mais recente para a mais antiga
            .map((stat) => (
              <tr key={stat.season}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.season}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.games}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.minutesPg}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.assists}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.offensiveRb}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.defensiveRb}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.totalRb}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.ftPercent !== null ? stat.ftPercent : '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.threeAttempts !== null ? stat.threeAttempts : '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {stat.steals}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>Estatísticas não encontradas.</p>
  )}
</div>
      </div>
    </>
  );
}
