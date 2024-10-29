import React from 'react';
import { PlayerStats } from '../../services/api';
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

// 統計情報表示用コンポーネント
interface StatisticsDisplayProps {
  stats: PlayerStats;
}

export const PersonalInfoTabPage: React.FC<StatisticsDisplayProps> = ({
  stats,
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

  // グラフ用のデータ整形
  const chartData = stats.skillHistory.map(item => ({
    date: formatDate(item.date).split(' ')[0], // 日付部分のみ使用
    SP: item.spSkillPoint,
    DP: item.dpSkillPoint
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">基本情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">登録日時:</p>
            <p className="text-lg font-semibold dark:text-white">{formatDate(stats.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">最終更新日時:</p>
            <p className="text-lg font-semibold dark:text-white">{formatDate(stats.updatedAt)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">現在のスキル</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">SP Total Flare Skill:</p>
            <p className="text-2xl font-bold dark:text-white">{stats.SP.totalFlareSkill.toLocaleString()}</p>
            <p className="text-lg dark:text-gray-300">{stats.SP.grade}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">DP Total Flare Skill:</p>
            <p className="text-2xl font-bold dark:text-white">{stats.DP.totalFlareSkill.toLocaleString()}</p>
            <p className="text-lg dark:text-gray-300">{stats.DP.grade}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">スキル推移</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                className="dark:text-gray-300"
              />
              <YAxis
                className="dark:text-gray-300"
                domain={[0, 'auto']}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="SP"
                name="SP Skill"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="DP"
                name="DP Skill"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
