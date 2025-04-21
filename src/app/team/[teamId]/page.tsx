"use client"

import { Team } from "@/interfaces/api";
import { getTeams } from "@/services/api";
import React, { useEffect, useState } from "react";

const StandingsTable: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();  // sua rota backend
        const data = await response.json();

        // ajuste se necessário conforme a estrutura do retorno da sua API
        const parsedTeams = data.resultSets[0].rowSet.map((row: any) => ({
          id: parseInt(row[3]),      // TEAM_ID
          name: row[4],             // TEAM_NAME
          min_year: row[1],         // MIN_YEAR
          max_year: row[2]          // MAX_YEAR
        }));

        setTeams(parsedTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="text-center text-white">Carregando times...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Conferência Leste</h2>
      <table className="w-full table-auto border-collapse text-left text-white">
        <thead>
          <tr>
            <th className="p-2">Equipe</th>
            <th className="p-2">Ano Inicial</th>
            <th className="p-2">Ano Final</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="border-t border-gray-700">
              <td className="p-2 flex items-center gap-2">
                <img
                  src={`https://cdn.nba.com/logos/nba/${team.id}/global/L/logo.svg`}
                  alt={team.name}
                  className="w-8 h-8"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                {team.name}
              </td>
              <td className="p-2">{team.min_year}</td>
              <td className="p-2">{team.max_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
