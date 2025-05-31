import { useEffect, useState } from "react";
import { TeamStats } from "@/interfaces/api";

type ProgressRowProps = {
  team: TeamStats;
  winPercentage: number;
};

export const ProgressRow: React.FC<ProgressRowProps> = ({ team, winPercentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(winPercentage), 100); // delay para trigger da animação
    return () => clearTimeout(timer);
  }, [winPercentage]);

  return (
    <tr
      className="relative border-t border-gray-700 cursor-pointer overflow-hidden group"
      onClick={() => {
        window.location.href = `/team/${team.TEAM_ID}`;
      }}
    >
      {/* Background bar */}
      <td colSpan={4} className="absolute inset-0 z-0">
        <div
          className="h-full bg-green-200 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </td>

      {/* Actual content */}
      <td className="p-2 relative z-10 flex items-center gap-2">
        <img
          src={`https://cdn.nba.com/logos/nba/${team.TEAM_ID}/global/L/logo.svg`}
          alt={team.TEAM_ABBREVIATION}
          className="w-8 h-8"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {team.TEAM_NAME}
      </td>
      <td className="p-2 relative z-10">{team.W}</td>
      <td className="p-2 relative z-10">{team.L}</td>
      <td className="p-2 relative z-10">{winPercentage.toFixed(1)}%</td>
    </tr>
  );
};
