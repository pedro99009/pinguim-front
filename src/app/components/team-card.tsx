import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Team } from "@/types/api"
import Link from "next/link"

interface TeamCardProps {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/teams/${team.id}`} passHref>
      <Card className="cursor-pointer transition-colors hover:bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{team.full_name}</span>
            <span className="text-sm text-muted-foreground">{team.abbreviation}</span>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {team.conference} Conference • {team.division} Division
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
