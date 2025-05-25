'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPlayerCareerStats, getPlayersById, getPlayersByTeam } from '@/services/api'; // você precisa criar essa função
import Header from '@/app/components/Header';
import { PlayerCareerStats, PlayerIndex } from '@/interfaces/api';

export default function PlayerPage() {
  const { teamId, playerId } = useParams<{ teamId: string; playerId: string }>();
  const [careerStats, setCareerStats] = useState<PlayerCareerStats[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [playerInfo, setPlayersInfo] = useState<PlayerIndex | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) return;

    (async () => {
      try {
        const data = await getPlayerCareerStats(playerId);
        const apiPlayerInfo = await getPlayersById(playerId);
        const headers = data.resultSets[0].headers;
        const rows = data.resultSets[0].rowSet;

        console.log("BOSTA:",apiPlayerInfo);

        const parsedStats: PlayerCareerStats[] = rows.map((row: any[]) =>
          Object.fromEntries(headers.map((key: string, i: number) => [key, row[i]]))
        );

        const parsedPlayersInfo: PlayerIndex[] = apiPlayerInfo.resultSets[0].rowSet.map((row: any) => ({
            PERSON_ID:         row[0],
            PLAYER_FIRST_NAME: row[1],
            PLAYER_LAST_NAME:  row[2],
            JERSEY_NUMBER:     row[14],
            POSITION:          row[15],
            HEIGHT:            row[12],
            WEIGHT:            row[11],
            BIRTHDATE:         row[7]
        }));

        console.log("PARSED",parsedPlayersInfo[0]);

        setCareerStats(parsedStats);
        setPlayersInfo(parsedPlayersInfo[0]);
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [playerId]);

  const filteredStats = selectedSeason === 'all'
    ? careerStats
    : careerStats.filter(stat => stat.SEASON_ID === selectedSeason);

  if (loading) return <div className="text-center text-black">Carregando jogador...</div>;
  if (!playerInfo) return <div className="text-center text-black">Jogador não encontrado.</div>;

  return (
    <>
      <Header />
      <div className="mx-auto flex gap-6 items-center bg-white">
        
        <img
            src={`https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`}
            alt="Foto do jogador"
            className="w-40 h-auto rounded-xl bg-white"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <img
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
            alt="Foto do jogador"
            className="w-40 h-auto rounded-xl bg-white"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div>
            <h1 className="text-3xl font-bold">
              { `${playerInfo.PLAYER_FIRST_NAME} ${playerInfo.PLAYER_LAST_NAME}`}
            </h1>
            <p>Idade: {playerInfo.BIRTHDATE}</p>
            <p>Posição: {playerInfo.POSITION || '–'}</p>
            <p>Altura: {playerInfo.HEIGHT || '–'}</p>
            <p>Peso: {playerInfo.WEIGHT || '–'} lb</p>
          </div>
        <div className="max-w-6xl mx-auto flex gap-6 items-center">
          
          
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Estatísticas de Carreira</h2>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">Todas as temporadas</option>
            {careerStats.map(stat => (
              <option key={stat.SEASON_ID} value={stat.SEASON_ID}>{stat.SEASON_ID}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr>
                <th className="p-2">Temporada</th>
                <th className="p-2">Time</th>
                <th className="p-2">PTS</th>
                <th className="p-2">REB</th>
                <th className="p-2">AST</th>
                <th className="p-2">FG%</th>
                <th className="p-2">3P%</th>
                <th className="p-2">FT%</th>
              </tr>
            </thead>
            <tbody>
              {filteredStats.map((stat, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                  <td className="p-2">{stat.SEASON_ID}</td>
                  <td className="p-2">{stat.TEAM_ABBREVIATION}</td>
                  <td className="p-2">{stat.PTS}</td>
                  <td className="p-2">{stat.REB}</td>
                  <td className="p-2">{stat.AST}</td>
                  <td className="p-2">{(stat.FG_PCT * 100).toFixed(1)}%</td>
                  <td className="p-2">{(stat.FG3_PCT * 100).toFixed(1)}%</td>
                  <td className="p-2">{(stat.FT_PCT * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
