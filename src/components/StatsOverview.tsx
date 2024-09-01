import * as React from 'react';

interface StatsOverviewProps {
  totalFlareSkill: number;
  grade: string;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ totalFlareSkill, grade }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">統計情報</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">トータルフレアスキル:</p>
          <p className="text-3xl font-semibold">{totalFlareSkill.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">グレード:</p>
          <p className="text-3xl font-semibold">{grade}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;