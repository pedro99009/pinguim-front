import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Team } from "@/types/api"

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
        <div className="space-y-2">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-2 border rounded-md">
              <span>{team.full_name}</span>
              <span className="text-sm text-muted-foreground">{team.abbreviation}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
