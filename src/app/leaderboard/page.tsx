"use client";

import { useEffect, useState, useMemo } from "react";
import { getClassification } from "@/services/api";
import { TeamStats } from "@/interfaces/api";
import Header from "../components/Header";


// Define the sortable keys, including custom key for win percentage and name
type SortKey = 'TEAM_NAME' | keyof Pick<TeamStats, 'GP' | 'W' | 'L'> | 'PCT';
type SortOrder = 'asc' | 'desc';

const StandingsTable: React.FC = () => {
  const [teams, setTeams] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);

  // Sorting state
  const [sortKey, setSortKey] = useState<SortKey>('W');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const response = await getClassification();
        const parsedTeams = response.resultSets[0].rowSet.map((row: any) => ({
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
        setTeams(parsedTeams);
      } catch (error) {
        console.error("Error fetching classification:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassification();
  }, []);

  // Memoized sorted teams list
  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => {
      let comparison = 0;

      if (sortKey === 'PCT') {
        const aPct = a.GP ? a.W / a.GP : 0;
        const bPct = b.GP ? b.W / b.GP : 0;
        comparison = aPct - bPct;
      } else if (sortKey === 'TEAM_NAME') {
        comparison = a.TEAM_NAME.localeCompare(b.TEAM_NAME);
      } else {
        comparison = (a[sortKey] as number) - (b[sortKey] as number);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [teams, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle order
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // New sort key: default to descending
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  if (loading) return <div className="text-center text-black">Carregando classificação...</div>;

  return (
    <>
    <Header />
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-black mb-4">Classificação da NBA</h2>
      <table className="w-full table-auto border-collapse text-left text-black">
        <thead>
          <tr>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort('TEAM_NAME')}
            >
              Equipe {sortKey === 'TEAM_NAME' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort('W')}
            >
              Vitórias {sortKey === 'W' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort('L')}
            >
              Derrotas {sortKey === 'L' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort('PCT')}
            >
              % Vitória {sortKey === 'PCT' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => {
            const winPercentage = team.GP ? ((team.W / team.GP) * 100).toFixed(1) : '0.0';
            return (
              <tr key={team.TEAM_ID} className="border-t border-gray-700">
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={`https://cdn.nba.com/logos/nba/${team.TEAM_ID}/global/L/logo.svg`}
                    alt={team.TEAM_ABBREVIATION}
                    className="w-8 h-8"
                    onError={(e) => (e.currentTarget.style.display = "none")}
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
