import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

interface TimeIndicatorProps {
  currentTime: Date;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

const TimeIndicator: React.FC<TimeIndicatorProps> = ({ currentTime, progress }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDayProgress = (date: Date): number => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / 1440) * 100;
  };

  const dayProgress = calculateDayProgress(currentTime);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">{formatDate(currentTime)}</h3>
            <p className="text-lg font-bold text-blue-500 dark:text-blue-400">{formatTime(currentTime)}</p>
          </div>
        </div>
        
        {progress && (
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Today's Progress</h3>
              <p className="text-lg font-bold text-green-500">
                {progress.completed}/{progress.total} Tasks ({Math.round(progress.percentage)}%)
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-500 dark:bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${dayProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>12 AM</span>
        </div>
      </div>
    </div>
  );
};

export default TimeIndicator;