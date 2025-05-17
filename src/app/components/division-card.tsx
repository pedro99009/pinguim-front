// components/division-card.tsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { TeamStats } from "@/interfaces/api";
import { TeamCard } from "./team-card";
import {  getTeamsByDivison } from "@/services/api";


interface DivisionCardProps {
  division: string;
}

export function DivisionCard({ division }: DivisionCardProps) {
  const [teams, setTeams] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      try {
        const data = await getTeamsByDivison(division);
        // A API retorna resultSets[0].headers e resultSets[0].rowSet
        const { headers, rowSet } = data.resultSets[0];
        const mapped: TeamStats[] = rowSet.map((row: any[]) => {
          const obj: any = {};
          headers.forEach((key: string, idx: number) => {
            obj[key] = row[idx];
          });
          return obj as TeamStats;
        });
        setTeams(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, [division]);

  if (loading) {
    return <Card className="p-4 shadow-lg border">Carregando…</Card>;
  }
  if (error) {
    return <Card className="p-4 shadow-lg border">Erro: {error}</Card>;
  }
  if (teams.length === 0) {
    return <Card className="p-4 shadow-lg border">Nenhum time nesta divisão.</Card>;
  }

  return (
    <Card className="p-4 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {division} Division
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <TeamCard key={team.TEAM_ID} team={team} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
