import React from 'react';
import SongTableBase, { ColumnConfig } from '../SongTableBase';
import { SkillBookSong } from './SkillBookSongRow';
import useWindowSize from '../../util/UseWindowSize';
import { getChartTypeBackgroundClass, convertToFlareRankString } from '../../util/DdrDefinitionUtil';
import { Link } from 'react-router-dom';

interface SkillBookSongTableProps {
    songs: SkillBookSong[];
}

const SkillBookSongTable: React.FC<SkillBookSongTableProps> = ({ songs }) => {
    const { width } = useWindowSize();
    const isMobile = width < 768; // md breakpoint in Tailwind

    const columns: ColumnConfig<SkillBookSong>[] = [
        {
            header: '',
            key: null,
            sortable: false,
            render: (_, index) => <span className="font-medium dark:text-gray-300">{index + 1}</span>,
            className: 'w-[10%] px-0 md:px-2 text-left'
        },
        {
            header: 'Title',
            key: 'title',
            sortable: true,
            render: (song) => (
                <div className="font-medium text-gray-900 dark:text-white text-xs md:text-sm group relative">
                    <Link
                        to={`/song-detail/${song.id}/${song.chartType}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words whitespace-normal hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-200 border-b border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300"
                    >
                        {song.title}
                    </Link>
                    <span className="absolute top-full left-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        統計情報を見る
                    </span>
                </div>
            ),
            className: 'w-[35%] px-0 md:px-2 text-left'
        },
        ...(!isMobile ? [
            {
                header: 'Type',
                key: 'chartType',
                sortable: false,
                render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.chartType}</span>,
                className: 'w-[12%] px-1 md:px-2 text-left'
            },
            {
                header: 'Level',
                key: 'level',
                sortable: true,
                sortType: 'number',
                render: (song) => <span className="text-gray-600 dark:text-gray-400">{song.level}</span>,
                className: 'w-[12%] px-1 md:px-2 text-left'
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
                className: 'w-[15%] px-0 text-left'
            }
        ]) as ColumnConfig<SkillBookSong>[],
        {
            header: isMobile ? 'FR' : 'Flare Rank',
            key: 'flareRank',
            sortable: true,
            sortType: 'number',
            render: (song) => (
                <span className="px-0 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
                    {convertToFlareRankString(song.flareRank)}
                </span>
            ),
            className: 'w-[15%] px-0 md:px-2 text-left'
        },
        {
            header: isMobile ? 'FS' : 'Flare Skill',
            key: 'flareSkill',
            sortable: true,
            sortType: 'number',
            render: (song) => <span className="font-medium text-indigo-600 dark:text-indigo-400" >{song.flareSkill}</span>,
            className: 'w-[18%] px-0 md:px-2 text-left'
        },
        {
            header: 'Score',
            key: 'score',
            sortable: true,
            sortType: 'number',
            render: (song) => <span className={`text-gray-600 dark:text-gray-400 ${isMobile ? ' text-xs' : ''}`} >{song.score.toLocaleString()}</span>,
            className: 'w-[18%] px-0 md:px-2 text-left'
        },
    ];

    return (
        <div className='md:w-[750px]'>
            <SongTableBase
                items={songs}
                columns={columns}
                initialSortKey="flareSkill"
                initialSortDirection="desc"
                tableClassName="w-full table-fixed"
                headerClassName="bg-gray-50 dark:bg-gray-700"
                rowClassName="hover:bg-gray-50 dark:hover:bg-gray-700"
                getBackgroundClass={getChartTypeBackgroundClass}
            />
        </div>
    );
};

export default SkillBookSongTable;