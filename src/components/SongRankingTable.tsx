import React from 'react';
import SongTableBase, { ColumnConfig } from './SongTableBase';
import { RankingSong } from './RankingSongRow';
import useWindowSize from '../util/UseWindowSize';
import { getChartTypeBackgroundClass, convertToFlareRankString } from '../util/DdrDefinitionUtil';

interface RankingSongTableProps {
    songs: RankingSong[];
}

const RankingSongTable: React.FC<RankingSongTableProps> = ({ songs }) => {

    const { width } = useWindowSize();
    const isMobile = width < 768; // md breakpoint in Tailwind
    const columns: ColumnConfig<RankingSong>[] = [

        {
            header: '',
            key: null,
            sortable: false,
            render: (_, index) => <span className="font-medium dark:text-gray-300">{index + 1}</span>,
            className: 'w-[16px] md:w-12 px-1 md:px-2 text-left'
        },
        {
            header: 'Title',
            key: 'title',
            sortable: true,
            render: (song) => (
                <div className="font-medium text-gray-900 dark:text-white text-xs md:text-sm">
                    <span className="break-word whitespace-normal">{song.title}</span>
                </div>
            ),
            className: 'w-24 md:w-1/3 px-0 md:px-2 text-left'
        },
        ...(!isMobile ? [
            {
                header: 'Type',
                key: 'chartType',
                sortable: false,
                render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.chartType}</span>,
                className: 'w-14 md:w-16 px-1 md:px-2 text-left'
            },
            {
                header: 'Level',
                key: 'level',
                sortable: true,
                sortType: 'number',
                render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.level}</span>,
                className: 'w-10 md:w-12 px-1 md:px-2 text-left'
            }
        ] : [
            {
                header: 'Lv',
                key: 'level',
                sortable: true,
                sortType: 'number',
                render: (song) => (
                    <span className="text-gray-600 dark:text-gray-400">
                        {song.level}
                    </span>
                ),
                className: 'w-4 px-0 text-left'
            }
        ]) as ColumnConfig<RankingSong>[],
        {
            header: isMobile ? 'FR' : 'Flare Rank',
            key: 'flareRank',
            sortable: true,
            sortType: 'number',
            render: (song) => (
                <span className="px-1 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
                    {convertToFlareRankString(song.flareRank)}
                </span>
            ),
            className: 'w-6 md:w-12 px-0 md:px-2 text-left'
        },
        {
            header: isMobile ? 'FS' : 'Flare Skill',
            key: 'flareSkill',
            sortable: true,
            sortType: 'number',
            render: (song) => <span className="font-medium text-indigo-600 dark:text-indigo-400">{song.flareSkill}</span>,
            className: 'w-8 md:w-12 px-0 md:px-2 text-left'
        },
        {
            header: isMobile ? '%' : 'Overall %',
            key: 'overallPercentage',
            sortable: true,
            sortType: 'number',
            render: (song) => <span className={`text-gray-600 dark:text-gray-400 ${isMobile ? ' text-xs' : ''}`}>{song.overallPercentage.toFixed(2)}%</span>,
            className: 'w-8 md:w-12 px-0 md:px-2 text-left'
        },
    ];

    return (
        <SongTableBase
            items={songs}
            columns={columns}
            initialSortKey="overallPercentage"
            initialSortDirection="desc"
            tableClassName={`border-collapse w-full ${isMobile ? 'table-fixed' : ''}`}
            headerClassName="bg-blue-100 dark:bg-blue-800"
            rowClassName="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            getBackgroundClass={getChartTypeBackgroundClass}
        />
    );
};

export default RankingSongTable;