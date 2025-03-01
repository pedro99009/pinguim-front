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
          {playerStats.length > 0 && (
            <div className="mb-4">
              <label htmlFor="season" className="mr-2 font-medium">Selecionar Temporada:</label>
              <select
                id="season"
                value={selectedSeason || ''}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="border border-gray-300 rounded p-2"
              >
                {Array.from(new Set(playerStats.map(stat => stat.season)))
                  .sort((a, b) => b - a)
                  .map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
          )}

          {seasonStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Jogos:</span> {seasonStats.games}</p>
                <p><span className="font-medium">Minutos Jogados:</span> {seasonStats.minutesPg}</p>
                <p><span className="font-medium">Assists:</span> {seasonStats.assists}</p>
                <p>
                  <span className="font-medium">True Shooting %:</span> {seasonStats.ftPercent !== null ? seasonStats.ftPercent : '-'}
                </p>
                <p>
                  <span className="font-medium">3P AR:</span> {seasonStats.threeAttempts !== null ? seasonStats.threeAttempts : '-'}
                </p>
              </div>
              <div>
                <p><span className="font-medium">REB Ofensivo %:</span> {seasonStats.offensiveRb}</p>
                <p><span className="font-medium">REB Defensivo %:</span> {seasonStats.defensiveRb}</p>
                <p><span className="font-medium">REB Total %:</span> {seasonStats.totalRb}</p>
                <p><span className="font-medium">Assist %:</span> {seasonStats.assists}</p>
                <p><span className="font-medium">Steal %:</span> {seasonStats.steals}</p>
              </div>
            </div>
          ) : (
            <p>Estatísticas não encontradas para a temporada selecionada.</p>
          )}
        </div>
      </div>
    </>
  );
}
