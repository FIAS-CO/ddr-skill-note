import * as React from 'react';
import { BaseSong } from '../../types/song';
import BaseSongRow from '../BaseSongRow';

export interface SkillBookSong extends BaseSong {
  score: number;
  flareSkill: number;
}

interface SkillBookSongRowProps {
  song: SkillBookSong;
  ranking: number;
}

export const SkillBookSongRow: React.FC<SkillBookSongRowProps> = ({ song, ranking }) => {
  const isGrayBackground = ranking >= 31;
  return (
    <BaseSongRow<SkillBookSong>
      song={song}
      className={isGrayBackground ? 'bg-gray-100 dark:bg-gray-700' : 'dark:bg-gray-800'}
      renderCells={(song) => [
        <div className="font-medium dark:text-gray-300 text-left">{ranking}</div>,
        <div className="font-medium text-gray-900 dark:text-white text-left whitespace-normal sm:whitespace-nowrap">{song.title}</div>,
        <span className="text-gray-600 dark:text-gray-400">{song.chartType}</span>,
        <span className="text-gray-600 dark:text-gray-400">{song.level}</span>,
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
          {song.flareRank}
        </span>,
        <span className="text-gray-600 dark:text-gray-400">{song.score.toLocaleString()}</span>,
        <span className="font-medium text-indigo-600 dark:text-indigo-400">{song.flareSkill}</span>
      ]}
    />
  );
};

export default SkillBookSongRow;