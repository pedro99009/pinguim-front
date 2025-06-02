'use client';

import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getTeamEfficiencyStats,
  getClassification,
} from "@/services/api";
import { TeamAdvancedStats, TeamStats } from "@/interfaces/api";

export default function Dashboard() {
  // 1) Temporadas disponíveis e opções de Top N
  const availableSeasons = ["2021-22", "2022-23", "2023-24", "2024-25"];
  const topNOptions = [4, 5, 6, 7, 8];

  // 2) Estados
  const [season, setSeason] = useState<string>("2024-25");
  const [topN, setTopN] = useState<number>(4);
    
  const [teamStats, setTeamStats] = useState<TeamAdvancedStats[]>([]);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  const [teams, setTeams] = useState<TeamStats[]>([]);
  const [loadingTeams, setLoadingTeams] = useState<boolean>(true);

  // 3) Pega classificação (Pie Charts) sempre que season ou topN mudarem
  useEffect(() => {
    async function fetchClassification() {
      setLoadingTeams(true);
      try {
        const data = await getClassification("Overall", season);
        const parsed: TeamStats[] = data.resultSets[0].rowSet
          .map((row: any) => ({
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
          }))
          .sort((a:any, b:any) => b.W - a.W)
          .slice(0, topN);   // agora usa topN

        setTeams(parsed);
      } catch (error) {
        console.error("Erro ao carregar classificação:", error);
        setTeams([]);
      } finally {
        setLoadingTeams(false);
      }
    }

    fetchClassification();
  }, [season, topN]);

  // 4) Pega estatísticas de eficiência (Bar Charts) sempre que season ou topN mudarem
  useEffect(() => {
    async function fetchEfficiency() {
      setLoadingStats(true);
      try {
        const raw = await getTeamEfficiencyStats(season, "Per100Possessions");
        const rows = raw.resultSets[0].rowSet;
        const headers = raw.resultSets[0].headers;

        const stats: TeamAdvancedStats[] = rows.map((row: any[]) => {
          const obj: any = {};
          headers.forEach((key: string, index: number) => {
            obj[key] = row[index];
          });
          return obj as TeamAdvancedStats;
        });

        const topTeamsByNet = stats
          .filter((t) => t.NET_RATING !== undefined)
          .sort((a, b) => b.NET_RATING! - a.NET_RATING!)
          .slice(0, topN); // agora usa topN

        setTeamStats(topTeamsByNet);
      } catch (err) {
        console.error("Erro ao carregar estatísticas de eficiência:", err);
        setTeamStats([]);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchEfficiency();
  }, [season, topN]);

  // 5) Handlers para Selects
  function handleSeasonChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSeason(e.target.value);
  }

  function handleTopNChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTopN(Number(e.target.value));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Seletores de Temporada e Top N */}
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="season-select" className="font-medium">
              Temporada:
            </label>
            <select
              id="season-select"
              value={season}
              onChange={handleSeasonChange}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {availableSeasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="topn-select" className="font-medium">
              Top N times:
            </label>
            <select
              id="topn-select"
              value={topN}
              onChange={handleTopNChange}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {topNOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seção classificatória (Pie Charts) - AGORA no topo */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            🏀 Top {topN} Times da Temporada ({season})
          </h1>

          {loadingTeams ? (
            <div className="text-center text-gray-500 animate-pulse">
              Carregando classificação...
            </div>
          ) : teams.length === 0 ? (
            <div className="text-center text-gray-500">
              Nenhum time encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teams.map((team) => (
                <div
                  key={team.TEAM_ID}
                  className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => (window.location.href = `/team/${team.TEAM_ID}`)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://cdn.nba.com/logos/nba/${team.TEAM_ID}/global/L/logo.svg`}
                      alt={team.TEAM_ABBREVIATION}
                      className="w-12 h-12"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {team.TEAM_NAME}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Vitórias: <strong>{team.W}</strong> / Derrotas:{" "}
                        <strong>{team.L}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={[
                            { name: "Vitórias", value: team.W },
                            { name: "Derrotas", value: team.L },
                          ]}
                          innerRadius={40}
                          outerRadius={50}
                          paddingAngle={2}
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seção de Eficiência (Bar Charts) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Top {topN} Times (Eficiência) – Temporada {season}
          </h2>

          {loadingStats ? (
            <div className="text-center text-gray-500 animate-pulse">
              Carregando estatísticas de eficiência...
            </div>
          ) : teamStats.length === 0 ? (
            <div className="text-center text-gray-500">
              Nenhuma estatística de eficiência encontrada.
            </div>
          ) : (
            <>
              {/* Gráfico de Offense / Defense Rating */}
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={teamStats}
                  margin={{ top: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="TEAM_NAME"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="OFF_RATING"
                    fill="#4ade80"
                    name="Ofensivo"
                  />
                  <Bar
                    dataKey="DEF_RATING"
                    fill="#60a5fa"
                    name="Defensivo"
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Gráfico de Net Rating */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={teamStats}
                  margin={{ top: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="TEAM_NAME"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="NET_RATING"
                    fill="#facc15"
                    name="Eficiência Líquida"
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
