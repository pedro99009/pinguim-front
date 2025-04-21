// components/team-card.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { TeamStats } from "@/interfaces/api";

interface TeamCardProps {
  team: TeamStats;
}

export function TeamCard({ team }: TeamCardProps) {
  // URL dinâmica para logo oficial
  const logoUrl = `https://cdn.nba.com/logos/nba/${team.TEAM_ID}/primary/L/logo.svg`;

  return (
    <Link href={`/team/${team.TEAM_ID}`} passHref>
      <Card className="cursor-pointer transition-colors hover:bg-muted flex items-center p-2">
        <img
          src={logoUrl}
          alt={`${team.TEAM_NAME} logo`}
          className="h-8 w-8 mr-3 flex-shrink-0"
        />
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between p-0">
            <span className="font-semibold">{team.TEAM_NAME}</span>
            <span className="text-sm text-muted-foreground ml-2">
              {team.TEAM_ABBREVIATION}
            </span>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
