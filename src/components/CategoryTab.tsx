import * as React from 'react';

type TabKey = 'CLASSIC' | 'WHITE' | 'GOLD';

interface TabProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
      <TabButton
        tabKey='CLASSIC'
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <TabButton
        tabKey='WHITE'
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <TabButton
        tabKey='GOLD'
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
};

interface TabButtonProps {
  tabKey: TabKey;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tabKey, activeTab, onTabChange }) => {
  return (
    <button
      className={`py-2 px-4 ${activeTab === tabKey
        ? 'border-b-2 border-blue-500 text-blue-500'
        : 'text-gray-500 hover:text-blue-500'
        }`}
      onClick={() => onTabChange(tabKey)}
    >{tabKey}</button>
  )
}

export default Tab;
