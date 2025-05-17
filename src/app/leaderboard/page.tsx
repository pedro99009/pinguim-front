"use client";

import { useEffect, useState } from "react";
import { getClassification } from "@/services/api";
import { TeamStats } from "@/interfaces/api";
import Header from "../components/Header";

const StandingsTable: React.FC = () => {
  const [teams, setTeams] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Conference filter state
  const [conference, setConference] = useState<'East' | 'West'>('East');
  const [season, setSeason] = useState('2024-25');

  useEffect(() => {
    const fetchClassification = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getClassification(conference, season);
        const parsedTeams: TeamStats[] = response.resultSets[0].rowSet.map((row: any) => ({
          TEAM_ID: row[0],
          TEAM_ABBREVIATION: row[1],
          TEAM_NAME: row[2],
          GP: row[3],
          W: row[4],
          L: row[5],
          MIN: row[6],
          DIST_FEET: row[7],
          DIST_MILES: row[8],
          DIST_MILES_OFF: row[9],
          DIST_MILES_DEF: row[10],
          AVG_SPEED: row[11],
          AVG_SPEED_OFF: row[12],
          AVG_SPEED_DEF: row[13],
        }));
        // Default sort by wins descending
        parsedTeams.sort((a: TeamStats, b: TeamStats): number => b.W - a.W);
        setTeams(parsedTeams);
      } catch (err: any) {
        console.error('Error fetching classification:', err);
        setError('Falha ao carregar classificação.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassification();
  }, [conference]);

  if (loading) return <div className="text-center text-black">Carregando classificação...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-black mb-4">Classificação da NBA</h2>
        {/* Conference Selection */}
        <div className="flex gap-4 mb-4 justify-center">
          {['East', 'West'].map((conf) => (
            <button
              key={conf}
              onClick={() => setConference(conf as 'East' | 'West')}
              className={`px-4 py-2 rounded-2xl border shadow-sm transition 
                ${conference === conf ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              {conf}
            </button>
          ))}
        </div>

        <table className="w-full table-auto border-collapse text-left text-black">
          <thead>
            <tr>
              <th className="p-2">Equipe</th>
              <th className="p-2">Vitórias</th>
              <th className="p-2">Derrotas</th>
              <th className="p-2">% Vitória</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              const winPercentage = team.GP ? ((team.W / team.GP) * 100).toFixed(1) : '0.0';
              return (
                <tr
                  key={team.TEAM_ID}
                  className="border-t border-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/team/${team.TEAM_ID}`;
                  }}
                >
                  <td className="p-2 flex items-center gap-2">
                    <img
                      src={`https://cdn.nba.com/logos/nba/${team.TEAM_ID}/global/L/logo.svg`}
                      alt={team.TEAM_ABBREVIATION}
                      className="w-8 h-8"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    {team.TEAM_NAME}
                  </td>
                  <td className="p-2">{team.W}</td>
                  <td className="p-2">{team.L}</td>
                  <td className="p-2">{winPercentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StandingsTable;
