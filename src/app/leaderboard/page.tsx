"use client";

import { useEffect, useRef, useState } from "react";
import { getClassification } from "@/services/api";
import { TeamStats } from "@/interfaces/api";
import Header from "../components/Header";
import { ProgressRow } from "../components/progressRow";

const StandingsTable: React.FC = () => {
  const [teams, setTeams] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, TeamStats[]>>(new Map());

  // Conference filter state
  const [conference, setConference] = useState<'East' | 'West'>('East');
  const [season, setSeason] = useState('2024-25');

  useEffect(() => {
    const fetchClassification = async () => {
    const key = `${conference}-${season}`;

  // Se já tiver no cache, usa direto
  if (cacheRef.current.has(key)) {
    setTeams(cacheRef.current.get(key)!);
    setLoading(false);
    return;
  }

  // Caso contrário, busca da API
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
    parsedTeams.sort((a, b) => b.W - a.W);

    // Salva no cache
    cacheRef.current.set(key, parsedTeams);

    setTeams(parsedTeams);
  } catch (err: any) {
    console.error("Error fetching classification:", err);
    setError("Falha ao carregar classificação.");
  } finally {
    setLoading(false);
  }
};
    


    fetchClassification();
  }, [conference]);

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <Header />
       <div className="max-w-5xl mx-auto p-4">
          {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-black font-semibold animate-pulse">Carregando...</span>
          </div>
        )}
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
              const percent = parseFloat(winPercentage);

              return (
                <ProgressRow
                  key={team.TEAM_ID}
                  team={team}
                  winPercentage={percent}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StandingsTable;
