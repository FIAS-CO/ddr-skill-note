import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getScoreDistoribution, getSkillBookSongs, getStats } from '../../services/api';
import { useState } from 'react';
import ScoreDistributionChart from './ScoreDistoributionChart';

const VALID_CHART_TYPES = ['BSP', 'DSP', 'ESP', 'CSP', 'BDP', 'DDP', 'EDP', 'CDP'] as const;
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

const SongDetailPage: React.FC = () => {

    const { songId } = useParams<{ songId: string }>();
    const { chartType, error } = useChartTypeParam();

    const [songName, setSongName] = useState<string | null>(null);
    const [exDistoribution, setExDistoribution] = useState<ScoreDistribution>();
    const [ivDistoribution, setIxDistoribution] = useState<ScoreDistribution>();
    const [error2, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    if (error) {
        return <ErrorPage message={error} />;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                {songName} / {chartType}
            </h1>
            <div className="w-full">
                <ScoreDistributionChart
                    data={exDistoribution?.distribution ?? []}
                    title={"Flare EX"}
                    minScore={exDistoribution?.minScore ?? 0}
                />
            </div>
        </div>
    );
}

export default SongDetailPage;