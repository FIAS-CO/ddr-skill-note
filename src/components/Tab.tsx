import * as React from 'react';

interface TabProps {
  activeTab: 'SP' | 'DP';
  onTabChange: (tab: 'SP' | 'DP') => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
      <button
        className={`py-2 px-4 ${activeTab === 'SP'
          ? 'border-b-2 border-blue-500 text-blue-500'
          : 'text-gray-500 hover:text-blue-500'
          }`}
        onClick={() => onTabChange('SP')}
      >
        Single Play
      </button>
      <button
        className={`py-2 px-4 ${activeTab === 'DP'
          ? 'border-b-2 border-blue-500 text-blue-500'
          : 'text-gray-500 hover:text-blue-500'
          }`}
        onClick={() => onTabChange('DP')}
      >
        Double Play
      </button>
    </div>
  );
};

export default Tab;
