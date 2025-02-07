import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Team } from "@/interfaces/api"
import { TeamCard } from "./team-card"

interface DivisionCardProps {
  division: string
  teams: Team[]
}

export function DivisionCard({ division, teams }: DivisionCardProps) {
  return (
    <Card className="p-4 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{division} Division</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}