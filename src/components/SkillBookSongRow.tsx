import * as React from 'react';
import { BaseSong } from '../types/song';
import BaseSongRow from './BaseSongRow';

export interface SkillBookSong extends BaseSong {
  score: number;
  flareSkill: number;
}

interface SkillBookSongRowProps {
  song: SkillBookSong;
  ranking: number; // 新しく追加：行のインデックス
}

export const SkillBookSongRow: React.FC<SkillBookSongRowProps> = ({ song, ranking }) => {
  const isGrayBackground = ranking >= 31; // 31行目以降（インデックスは0から始まるため）

  return (
    <BaseSongRow<SkillBookSong>
      song={song}
      className={isGrayBackground ? 'bg-gray-100' : ''}
      renderCells={(song) => [
        <span className="font-medium">{ranking}</span>,
        <span className="font-medium text-gray-900">{song.title}</span>,
        <span className="text-gray-600">{song.level}</span>,
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {song.flareRank}
        </span>,
        <span className="text-gray-600">{song.score.toLocaleString()}</span>,
        <span className="font-medium text-indigo-600">{song.flareSkill}</span>
      ]}
    />
  );
};

export default SkillBookSongRow;