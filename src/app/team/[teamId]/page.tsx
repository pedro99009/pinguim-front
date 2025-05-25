'use client';


import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NextLink from 'next/link';
import { CommonTeamRoster, TeamInfoCommon } from '@/interfaces/api';
import { getPlayersByTeam, getTeamsById } from '@/services/api';
import Header from '@/app/components/Header';
import { Link } from 'lucide-react';

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState<TeamInfoCommon | null>(null);
  const [players, setPlayers] = useState<CommonTeamRoster[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  useEffect(() => {
    if (!teamId) return;

    (async () => {
      setLoadingPlayers(true);
      try {
        const teamData = await getTeamsById(teamId);
        console.log(teamData.resultSets[0]);
        const playersData = await getPlayersByTeam(teamId);

        const headers = playersData.resultSets[0].headers;
        const parsedPlayers: CommonTeamRoster[] = playersData.resultSets[0].rowSet.map((row: any[]) => {
          const player: any = {};
          headers.forEach((key: string, idx: number) => {
            player[key] = row[idx];
          });
          return player as CommonTeamRoster;
        });

        setPlayers(parsedPlayers);
        console.log(parsedPlayers);

        const parsedTeam: TeamInfoCommon[] = teamData.resultSets[0].rowSet.map((row: any) => ({
          TEAM_ID: row[0],
          SEASON_YEAR: row[1],
          TEAM_CITY: row[2],
          TEAM_NAME: row[3],
          TEAM_ABBREVIATION: row[4],
          TEAM_CONFERENCE: row[5],
          TEAM_DIVISION: row[6],
          TEAM_CODE: row[7],
          TEAM_SLUG: row[8],
          W: row[9],
          L: row[10],
          PCT: row[11],
          CONF_RANK: row[12],
          DIV_RANK: row[13],
          MIN_YEAR: row[14],
          MAX_YEAR: row[15],
        }));

        setTeam(parsedTeam[0]);
        console.log("team", parsedTeam);
      } catch (error) {
        console.error('Erro ao buscar jogadores ou time:', error);
      } finally {
        setLoadingPlayers(false);
        setLoading(false);
      }
    })();
  }, [teamId]);

  if (loading) return <div className="text-center text-black">Carregando time...</div>;
  if (!team) return <div className="text-center text-black">Time não encontrado.</div>;

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={`https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`}
            alt={team.TEAM_NAME}
            className="w-60 h-auto"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="text-black">
            <h2 className="text-2xl font-bold mb-2">{team.TEAM_ABBREVIATION}</h2>
            <p><strong>Ano Inicial:</strong> {team.MIN_YEAR}</p>
            <p><strong>Ano Final:</strong> {team.MAX_YEAR}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-black mb-2">Jogadores</h3>
        {loadingPlayers ? (
          <p className="text-black">Carregando jogadores...</p>
        ) : players && players.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-left text-black">
              <thead>
                <tr>
                  <th className="p-2">Foto</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Número</th>
                  <th className="p-2">Posição</th>
                  <th className="p-2">Altura</th>
                  <th className="p-2">Peso</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.PLAYER_ID} className="border-t border-gray-700">

                    <td className="p-2">
                      <NextLink href={`/team/${teamId}/player/${player.PLAYER_ID}`} passHref>
                        <img
                          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.PLAYER_ID}.png`}
                          className="w-20 h-auto rounded-lg"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </NextLink>
                    </td>
                    <td className="p-2">
                      <NextLink href={`/team/${teamId}/player/${player.PLAYER_ID}`} passHref>
                        {player.PLAYER}
                      </NextLink>
                    </td>
                    <td className="p-2">{player.NUM || '-'}</td>
                    <td className="p-2">{player.POSITION || '-'}</td>
                    <td className="p-2">{player.HEIGHT}</td>
                    <td className="p-2">{player.WEIGHT}lb</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-black">Nenhum jogador encontrado.</p>
        )}
      </div>
    </>
  );
}