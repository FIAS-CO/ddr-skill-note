import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getScoreDistoribution } from '../../services/api';
import { useState } from 'react';
import ScoreDistributionChart from './ScoreDistoributionChart';
import { useCheckIsMobile } from '../../util/UseWindowSize';

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
    const [exDistoribution, setExDistoribution] = useState<ScoreDistribution>();
    const [ixDistoribution, setIxDistoribution] = useState<ScoreDistribution>();
    const [error2, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNoChart, setIsNoChart] = useState(true);
    const isMobile = useCheckIsMobile();

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
                const distoribution = await getScoreDistoribution(songId, chartType);

                setSongName(distoribution.songName);
                setSongLevel(distoribution.songLevel);
                setIsNoChart(distoribution.songLevel === 0)
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

        if (window.location.hostname === hostname) {
            // AdSenseスクリプトの初期化
            const adsbygoogle = document.createElement('script');
            adsbygoogle.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            adsbygoogle.async = true;
            adsbygoogle.crossOrigin = "anonymous";
            document.head.appendChild(adsbygoogle);

            // DOMが更新された後にAdSenseを再実行
            window.adsbygoogle = window.adsbygoogle || [];
            setTimeout(() => {
                window.adsbygoogle.push({});
            }, 1000);
        }
    }, [chartType]);

    if (error) {
        return <ErrorPage message={error} />;
    }
    if (error2) {
        return <ErrorPage message={error2} />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`container mx-auto py-8 pt-24 sm:pt-16 ${isMobile ? 'm-0 px-0' : 'px-4'}`}>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                {songName} / {chartType}({songLevel})
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

            {isNoChart ? <div>No Chart "{chartType}"</div> :
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
            }
        </div>
    );
}

export default SongDetailPage;