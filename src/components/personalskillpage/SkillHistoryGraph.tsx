import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { SkillHistoryPoint } from '../../services/api';
import { PlayStyle } from '../../types/Types';

interface SkillHistoryGraphProps {
    playStyle: PlayStyle;
    skillHistory: SkillHistoryPoint[];
}

export const SkillHistoryGraph: React.FC<SkillHistoryGraphProps> = ({
    playStyle, skillHistory
}) => {

    // 日付フォーマット変換関数
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Tokyo'
        }) + ' JST';
    };

    const formatXAxis = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ja-JP', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // グラフ用のデータ整形
    const chartData = skillHistory.map(item => ({
        date: item.date,
        point: (playStyle === 'SP') ? item.spSkillPoint : item.dpSkillPoint
    })).filter(item => (item.point != 0));

    return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">スキル推移</h2>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        scale="time"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={formatXAxis}
                        className="dark:text-gray-300" />
                    <YAxis
                        className="dark:text-gray-300"
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => value.toLocaleString()} />
                    <Tooltip
                        labelFormatter={formatDate}
                        formatter={(value: number) => value.toLocaleString()} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="point"
                        name="Flare Skill"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        data={chartData.map(item => ({
                            date: new Date(item.date).getTime(),
                            point: item.point
                        }))} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>;
};
