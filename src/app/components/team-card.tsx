import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Team } from "@/types/api"

interface TeamCardProps {
  team: Team
  onClick: (team: Team) => void
  isSelected: boolean
}

export function TeamCard({ team, onClick, isSelected }: TeamCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-muted ${isSelected ? "border-primary" : ""}`}
      onClick={() => onClick(team)}
    >
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
  )
}

