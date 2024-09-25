import React from 'react';
import SongTableBase, { ColumnConfig } from './SongTableBase';
import { RankingSong } from './RankingSongRow';

const columns: ColumnConfig<RankingSong>[] = [
    {
        header: 'Rank',
        key: null,
        sortable: false,
        render: (_, index) => <span className="font-medium dark:text-gray-300">{index + 1}</span>,
        className: 'w-16 text-center'
    },
    {
        header: 'Title',
        key: 'title',
        sortable: true,
        render: (song) => <span className="font-medium text-gray-900 dark:text-white">{song.title}</span>,
        className: 'w-1/3'
    },
    {
        header: 'Type',
        key: 'chartType',
        sortable: true,
        render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.chartType}</span>,
        className: 'w-24 text-center'
    },
    {
        header: 'Level',
        key: 'level',
        sortable: true,
        render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.level}</span>,
        className: 'w-20 text-center'
    },
    {
        header: 'Flare Rank',
        key: 'flareRank',
        sortable: true,
        render: (song) => (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                {song.flareRank}
            </span>
        ),
        className: 'w-28 text-center'
    },
    {
        header: 'Overall %',
        key: 'overallPercentage',
        sortable: true,
        render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.overallPercentage.toFixed(2)}%</span>,
        className: 'w-28 text-right'
    },
];

interface RankingSongTableProps {
    songs: RankingSong[];
}

const RankingSongTable: React.FC<RankingSongTableProps> = ({ songs }) => {
    return (
        <SongTableBase
            items={songs}
            columns={columns}
            initialSortKey="overallPercentage"
            initialSortDirection="desc"
            tableClassName="border-collapse w-full"
            headerClassName="bg-blue-100 dark:bg-blue-800"
            rowClassName="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
        />
    );
};

export default RankingSongTable;