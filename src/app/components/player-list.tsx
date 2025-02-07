import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/interfaces/api"

interface PlayerListProps {
  players: Player[]
  teamName: string
}

export function PlayerList({ players, teamName }: PlayerListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{teamName} Players</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {players.map((player) => (
            <div key={player.id} className="py-3">
              <div className="font-medium">
                {player.first_name} {player.last_name}
              </div>
              <div className="text-sm text-muted-foreground">Position: {player.position || "N/A"}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

