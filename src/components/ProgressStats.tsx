import React from 'react';
import { BarChart, Calendar } from 'lucide-react';
import MonthlyProgress from './MonthlyProgress';

interface ProgressStatsProps {
  activityHistory: Record<string, Record<string, boolean>>;
  currentDate: Date;
  todayProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
  setActivityHistory: React.Dispatch<React.SetStateAction<Record<string, Record<string, boolean>>>>;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ activityHistory, currentDate, todayProgress, setActivityHistory }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDailyProgress = (dateKey: string, totalTasks: number): { completed: number; total: number } => {
    const dayActivities = activityHistory[dateKey] || {};
    const completed = Object.values(dayActivities).filter(Boolean).length;
    return { completed, total: totalTasks };
  };

  const getRecentDates = (): string[] => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const markActivityComplete = (itemId: string) => {
    const todayKey = new Date().toISOString().split('T')[0];
    setActivityHistory(prev => ({
      ...prev,
      [todayKey]: {
        ...(prev[todayKey] || {}),
        [itemId]: true
      }
    }));
  };

    return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {formatDate(currentDate)}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <BarChart className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Last 7 Days Progress</span>
          </div>

          <div className="space-y-2">
            {getRecentDates().map((dateKey) => {
              const { completed, total } = calculateDailyProgress(dateKey, todayProgress.total);
              const percentage = total > 0 ? (completed / total) * 100 : 0;
              const date = new Date(dateKey);
              
              return (
                <div key={dateKey} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {completed}/{total} tasks ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 dark:bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <MonthlyProgress activityHistory={activityHistory} totalTasks={todayProgress.total} />
    </div>
  );
};

export default ProgressStats;

