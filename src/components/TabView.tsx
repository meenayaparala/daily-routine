import React from 'react';
import { List, BarChart } from 'lucide-react';

interface TabViewProps {
  activeTab: 'routine' | 'progress';
  onTabChange: (tab: 'routine' | 'progress') => void;
  todayProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

const TabView: React.FC<TabViewProps> = ({ activeTab, onTabChange, todayProgress }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex space-x-2">
        <button
          onClick={() => onTabChange('routine')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'routine'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <List className="h-5 w-5 mr-2" />
          <span>Daily Routine</span>
        </button>
        <button
          onClick={() => onTabChange('progress')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'progress'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <BarChart className="h-5 w-5 mr-2" />
          <span>Progress</span>
          {todayProgress.completed > 0 && (
            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {Math.round(todayProgress.percentage)}%
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TabView;