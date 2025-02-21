"use client"

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPlayerById, getTeams } from "@/services/api";
import type { Player, Team } from "@/interfaces/api";
import Header from "@/app/components/Header";

export default function PlayerPage({ 
  params 
}: { 
  params: Promise<{ teamId: string; playerId: string }> 
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get player data
        const playerResponse = await getPlayerById(resolvedParams.playerId);
        const playerData = playerResponse.data;

        if (!playerData) {
          setError("Player not found");
          return;
        }

        setPlayer(playerData);

        // Get team data to show team info
        const teamsResponse = await getTeams();
        const allTeams: Team[] = Array.isArray(teamsResponse.data)
          ? teamsResponse.data
          : [];
        const selectedTeam = allTeams.find(
          (t) => t.id.toString() === resolvedParams.teamId
        );

        if (selectedTeam) {
          setTeam(selectedTeam);
        }
      } catch (err) {
        console.error("Error fetching player data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [resolvedParams.playerId, resolvedParams.teamId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading player details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!player) {
    return <div className="text-center">Player not found</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <button
          onClick={() => router.push(`/team/${resolvedParams.teamId}`)}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back to {team?.full_name || 'team'} roster
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">
            {player.first_name} {player.last_name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Position:</span> {player.position || '-'}</p>
                  <p><span className="font-medium">Height:</span> {player.height || '-'}</p>
                  <p><span className="font-medium">Weight:</span> {player.weight || '-'}</p>
                  <p><span className="font-medium">Country:</span> {player.country || '-'}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">Draft Information</h2>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Draft Year:</span> {player.draft_year || '-'}</p>
                  <p><span className="font-medium">Draft Round:</span> {player.draft_round || '-'}</p>
                  <p><span className="font-medium">Draft Number:</span> {player.draft_number || '-'}</p>
                  <p><span className="font-medium">College:</span> {player.college || '-'}</p>
                </div>
              </div>
            </div>

            {/* You can add more sections here for statistics, career highlights, etc. */}
          </div>
        </div>
      </div>
    </>
  );
}