import * as React from 'react';
import { useState, useEffect } from 'react';
import { RankingSong, RankingSongRow } from './RankingSongRow';
import SkillBookSongRow, { SkillBookSong } from './SkillBookSongRow';

interface SongTableProps {
  songs: (RankingSong | SkillBookSong)[];
  type: 'ranking' | 'skillbook';
}

type SortKey = 'title' | 'level' | 'flareRank' | 'overallPercentage' | 'score' | 'flareSkill';

const flareRankOrder = ['EX', 'IX', 'VIII', 'VII', 'VI', 'V', 'IV', 'III', 'II', 'I', '0'];

const SongTable: React.FC<SongTableProps> = ({ songs, type }) => {
  const [sortKey, setSortKey] = useState<SortKey>('overallPercentage');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortedSongs, setSortedSongs] = useState<(RankingSong | SkillBookSong)[]>(songs);

  const headers = type === 'ranking'
    ? ['Rank', 'Title', 'Level', 'Flare Rank', 'Overall %']
    : ['Title', 'Level', 'Flare Rank', 'Score', 'Flare Skill'];

  const getSortKey = (header: string): SortKey | null => {
    switch (header) {
      case 'Rank':
        return null; // Rankはソート不可
      case 'Flare Rank':
        return 'flareRank';
      case 'Overall %':
        return 'overallPercentage';
      case 'Flare Skill':
        return 'flareSkill';
      default:
        return header.toLowerCase() as SortKey;
    }
  };

  const getSortValue = (song: RankingSong | SkillBookSong, key: SortKey): any => {
    console.log('Sorting by key:', key, 'Song:', JSON.stringify(song)); // オブジェクトの完全な内容をログ出力
    switch (key) {
      case 'flareRank':
        return flareRankOrder.indexOf(song.flareRank);
      case 'level':
        return Number(song.level);
      case 'overallPercentage':
        return 'overallPercentage' in song ? Number(song.overallPercentage) : -1;
      case 'score':
        return 'score' in song ? Number(song.score) : -1;
      case 'flareSkill':
        if ('flareSkill' in song) {
          console.log('flareSkill found:', song.flareSkill); // flareSkillの値をログ出力
          return Number(song.flareSkill);
        }
        console.log('flareSkill not found in song object'); // flareSkillが見つからない場合のログ
        return -1;
      default:
        const value = song[key as keyof (RankingSong | SkillBookSong)];
        console.log(`Value for key ${key}:`, value); // キーに対応する値をログ出力
        return value || '';
    }
  };

  useEffect(() => {
    const sorted = [...songs].sort((a, b) => {
      const valueA = getSortValue(a, sortKey);
      const valueB = getSortValue(b, sortKey);
      console.log('Comparing:', valueA, valueB); // デバッグログ

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    console.log('Sorted songs:', sorted.map(s => s.title)); // ソートされた曲のタイトルをログ出力
    setSortedSongs(sorted);
  }, [songs, sortKey, sortDirection]);

  const handleSort = (key: SortKey | null) => {
    if (key === null) return; // キーがnullの場合、ソートしない
    console.log('Sorting clicked:', key);
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (key: SortKey | null) => {
    if (key === null || key !== sortKey) return null;
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => {
                    const key = getSortKey(header);
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort(key)}
                      >
                        {header} {getSortIcon(key)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSongs.map((song, index) => (
                  type === 'ranking'
                    ? <RankingSongRow key={index} song={song as RankingSong} rank={index + 1} />
                    : <SkillBookSongRow key={index} song={song as SkillBookSong} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongTable;