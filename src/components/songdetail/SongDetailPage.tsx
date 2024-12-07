import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getGimmicksAndNotes, getScoreDistoribution, getSongMetadata } from '../../services/api';
import { useState } from 'react';
import ScoreDistributionChart from './ScoreDistoributionChart';
import { useCheckIsMobile } from '../../util/UseWindowSize';
import { ChartType } from '../../types/Types';
import { NominatedRanking } from '../../types/song';
import { SoflanIcon, StopIcon, ShockIcon } from '../icons/DdrIcons';

const VALID_CHART_TYPES = ['BESP', 'BSP', 'DSP', 'ESP', 'CSP', 'BDP', 'DDP', 'EDP', 'CDP'] as const;
type ValidChartType = typeof VALID_CHART_TYPES[number];

function isValidChartType(chartType: string): chartType is ValidChartType {
    return VALID_CHART_TYPES.includes(chartType as ValidChartType);
}

const ErrorPage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-700 mb-4">{message}</p>
        </div>
    </div>
);

function useChartTypeParam() {
    const { chartType } = useParams<{ chartType: string }>();
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!chartType || !isValidChartType(chartType)) {
            setError(`No such ChartType ${chartType}`);
        } else {
            setError(null);
        }
    }, [chartType]);

    return { chartType, error };
}

interface ScoreDistribution {
    minScore: number;
    maxScore: number;
    distribution: Array<{ scoreLowerBound: number; count: number }>;
}

const hostname = "flarenote.fia-s.com";
const SongDetailPage: React.FC = () => {
    const { songId } = useParams<{ songId: string }>();
    const { chartType, error } = useChartTypeParam();

    const [songName, setSongName] = useState<string | null>(null);
    const [songLevel, setSongLevel] = useState<number | null>(null);
    const [songVersion, setSongVersion] = useState<string | null>(null);
    const [songCategory, setSongCategory] = useState<string | null>(null);
    const [rankingInfo, setRankingInfo] = useState<NominatedRanking[] | null>(null);

    const [hasSoflan, setHasSoflan] = useState<boolean>(false);
    const [hasStop, setHasStop] = useState<boolean>(false);
    const [hasShockArrow, setHasShockArrow] = useState<boolean>(false);

    const [exDistoribution, setExDistoribution] = useState<ScoreDistribution>();
    const [ixDistoribution, setIxDistoribution] = useState<ScoreDistribution>();
    const [error2, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNoChart, setIsNoChart] = useState(true);
    const isMobile = useCheckIsMobile();


    React.useEffect(() => {
        if (window.location.hostname === hostname) {
            // AdSenseスクリプトの初期化
            const adsbygoogle = document.createElement('script');
            adsbygoogle.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8151928728657048";
            adsbygoogle.async = true;
            adsbygoogle.crossOrigin = "anonymous";
            document.head.appendChild(adsbygoogle);

            // DOMが更新された後にAdSenseを再実行
            window.adsbygoogle = window.adsbygoogle || [];
            setTimeout(() => {
                window.adsbygoogle.push({});
            }, 1000);
        }
    }, [])

    React.useEffect(() => {
        const fetchData = async () => {
            if (!songId || !chartType) {
                setError('ユーザーID/譜面タイプが提供されていません');
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {

                const [metadata, distoribution, gimmicksAndNotes] = await Promise.all([
                    getSongMetadata(songId, chartType as ChartType),
                    getScoreDistoribution(songId, chartType),
                    getGimmicksAndNotes(songId, chartType)
                ]);

                setSongName(metadata.name);
                setSongLevel(metadata.level);
                setIsNoChart(metadata.level === 0)
                setSongVersion(metadata.version)
                setSongCategory(metadata.category)
                setRankingInfo(metadata.nominatedRanking)

                setHasSoflan(gimmicksAndNotes.hasSoflan);
                setHasStop(gimmicksAndNotes.hasStop);
                setHasShockArrow(gimmicksAndNotes.hasShockArrow);

                setExDistoribution(distoribution.scoreDistributions.EX);
                setIxDistoribution(distoribution.scoreDistributions.IX);
            } catch (error) {
                console.error('データの取得中にエラーが発生しました:', error);
                setError('ユーザーデータの読み込みに失敗しました。後でもう一度お試しください。');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [songId, chartType]);

    if (error || error2) {
        return <ErrorPage message={error || error2 || '不明なエラーが発生しました'} />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`container mx-auto py-8 pt-24 sm:pt-16 ${isMobile ? 'm-0 px-0' : 'px-4'}`}>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                {songName}
            </h1>

            <div className="flex flex-wrap justify-center mb-8">
                {VALID_CHART_TYPES.map((type) => (
                    <Link
                        key={type}
                        to={`/song-detail/${songId}/${type}`}
                        className={`flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 mx-1 sm:mx-2 mb-2 rounded text-xs sm:text-sm md:text-base text-white ${chartType === type ? 'bg-blue-500' : 'bg-gray-500'
                            } w-[calc(20%-0.5rem)] sm:w-auto`}
                    >
                        {type}
                    </Link>
                ))}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">楽曲情報</h2>
                        <ul className="space-y-2">
                            <li>
                                <span className="font-medium">譜面タイプ:</span> {chartType}
                            </li>
                            <li>
                                <span className="font-medium">レベル:</span> {songLevel}
                            </li>
                            <li>
                                <span className="font-medium">バージョン:</span> {songVersion}
                            </li>
                            <li>
                                <span className="font-medium">カテゴリ:</span> {songCategory}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="font-medium">ギミック:</span>
                                <div className="flex gap-1">
                                    {hasSoflan && <SoflanIcon size={20} />}
                                    {hasStop && <StopIcon size={20} />}
                                    {hasShockArrow && <ShockIcon size={20} />}
                                    {!hasSoflan && !hasStop && !hasShockArrow &&
                                        <span>なし</span>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">対象頻度が高いグレード</h2>
                        <div>
                            <ul className="space-y-2">
                                {(rankingInfo) ? rankingInfo.map((info, index) => (
                                    <li key={index}>
                                        {info.grade} / Flare {info.flareRank} {info.overallPercentage.toFixed(2)}%
                                    </li>
                                )) : <div />}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {isNoChart ? (
                <div className="text-center text-gray-600">No Chart "{chartType}"</div>
            ) : (
                <div className="w-full">
                    <ScoreDistributionChart
                        data={exDistoribution?.distribution ?? []}
                        title={"Flare EX"}
                        minScore={exDistoribution?.minScore ?? 0}
                    />
                    <ScoreDistributionChart
                        data={ixDistoribution?.distribution ?? []}
                        title={"Flare IX"}
                        minScore={ixDistoribution?.minScore ?? 0}
                    />
                </div>
            )}
        </div>
    );
};

export default SongDetailPage;

