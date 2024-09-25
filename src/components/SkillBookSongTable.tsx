import React from 'react';
import SongTableBase, { ColumnConfig } from './SongTableBase';
import { SkillBookSong } from './SkillBookSongRow';

const columns: ColumnConfig<SkillBookSong>[] = [
    {
        header: '',
        key: null,
        sortable: false,
        render: (_, index) => <span className="font-medium dark:text-gray-300">{index + 1}</span>
    },
    {
        header: 'Title',
        key: 'title',
        sortable: true,
        render: (song) => <span className="font-medium text-gray-900 dark:text-white">{song.title}</span>
    },
    {
        header: 'Type',
        key: 'chartType',
        sortable: false,
        render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.chartType}</span>
    },
    {
        header: 'Level',
        key: 'level',
        sortable: true,
        render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.level}</span>
    },
    {
        header: 'Flare Rank',
        key: 'flareRank',
        sortable: true,
        render: (song) => (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
                {song.flareRank}
            </span>
        )
    },
    {
        header: 'Score',
        key: 'score',
        sortable: true,
        render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.score.toLocaleString()}</span>
    },
    {
        header: 'Flare Skill',
        key: 'flareSkill',
        sortable: true,
        render: (song) => <span className="font-medium text-indigo-600 dark:text-indigo-400">{song.flareSkill}</span>
    },
];

interface SkillBookSongTableProps {
    songs: SkillBookSong[];
}

const SkillBookSongTable: React.FC<SkillBookSongTableProps> = ({ songs }) => {
    return <SongTableBase items={songs} columns={columns} initialSortKey="flareSkill" />;
};

export default SkillBookSongTable;