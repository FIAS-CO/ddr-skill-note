import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCheckIsMobile } from '../../util/UseWindowSize';

interface ScoreDistributionChartProps {
    data: Array<{ scoreLowerBound: number; count: number }>;
    title: string;
    minScore: number;
}

const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({ data, title, minScore }) => {

    const isMobile = useCheckIsMobile();
    console.log(`isMobile:${isMobile}`)
    const formatXAxis = (tickItem: number): string => `${tickItem.toLocaleString()}~`;
    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-600">
                Minimum Score: {minScore.toLocaleString()}
            </p>
            <div className={`${isMobile ? 'w-[300px]' : 'w-[600px]'} h-[300px] min-h-[300px]`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="scoreLowerBound"
                            tickFormatter={formatXAxis}
                            label={{ value: 'Score Range', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis
                            label={{ value: 'Player Count', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                            formatter={(value) => [value, "Player Count"]}
                            labelFormatter={(label) => (
                                <span style={{ color: 'black' }}>
                                    {`Score: ${(label as number).toLocaleString()}~`}
                                </span>
                            )} />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ScoreDistributionChart;