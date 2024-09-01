import * as React from 'react';
import { RankingSong, RankingSongRow } from './RankingSongRow';
import SkillBookSongRow, { SkillBookSong } from './SkillBookSongRow';

interface SongTableProps {
  songs: (RankingSong | SkillBookSong)[];
  type: 'ranking' | 'skillbook';
}

const SongTable: React.FC<SongTableProps> = ({ songs, type }) => {
  const headers = type === 'ranking' 
    ? ['Rank', 'Title', 'Level', 'Flare Rank', 'Overall %']
    : ['Title', 'Level', 'Flare Rank', 'Score', 'Flare Skill'];

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th 
                      key={index}
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {songs.map((song, index) => (
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
