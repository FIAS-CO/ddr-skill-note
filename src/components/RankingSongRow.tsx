import BaseSongRow from "./BaseSongRow";
import { BaseSong } from "../types/song";

export interface RankingSong extends BaseSong {
  overallPercentage: number;
}

export const RankingSongRow: React.FC<{ song: RankingSong; rank: number }> = ({ song, rank }) => (
  <BaseSongRow<RankingSong>
    song={song}
    renderCells={(song) => [
      <span className="font-medium">{rank}</span>,
      <span className="font-medium text-gray-900">{song.title}</span>,
      <span className="text-gray-600">{song.level}</span>,
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {song.flareRank}
      </span>,
      <span className="text-gray-600">{song.overallPercentage}%</span>
    ]}
  />
);

