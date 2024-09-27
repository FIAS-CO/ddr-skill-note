import BaseSongRow from "./BaseSongRow";
import { BaseSong } from "../types/song";

export interface RankingSong extends BaseSong {
  overallPercentage: number;
  flareSkill: number;
}

export const RankingSongRow: React.FC<{ song: RankingSong; rank: number }> = ({ song, rank }) => (
  <BaseSongRow<RankingSong>
    song={song}
    renderCells={(song) => [
      <span className="font-medium dark:text-gray-300">{rank}</span>,
      <span className="font-medium text-gray-900 dark:text-white">{song.title}</span>,
      <span className="text-gray-600 dark:text-gray-400">{song.chartType}</span>,
      <span className="text-gray-600 dark:text-gray-400">{song.level}</span>,
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
        {song.flareRank}
      </span>,
      <span className="text-gray-600 dark:text-gray-400">{song.overallPercentage.toFixed(2)}%</span>
    ]}
  />
);

