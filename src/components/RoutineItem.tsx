import React from 'react';
import { Clock, Book, Coffee, Utensils, Heart, Brain, Moon, Check } from 'lucide-react';
import { RoutineItemType } from '../types/routine';

interface RoutineItemProps extends RoutineItemType {
  isCurrent?: boolean;
  completed?: boolean;
  onToggleComplete?: () => void;
}

const RoutineItem: React.FC<RoutineItemProps> = ({ 
  time, 
  activity, 
  purpose, 
  type, 
  isCurrent,
  completed,
  onToggleComplete 
}) => {
  // Get the appropriate icon based on the activity type
  const getIcon = () => {
    switch (type) {
      case 'focus':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'wellness':
        return <Heart className="h-5 w-5 text-green-500" />;
      case 'meal':
        return <Utensils className="h-5 w-5 text-amber-500" />;
      case 'rest':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'break':
        return <Coffee className="h-5 w-5 text-blue-500" />;
      default:
        return <Book className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={`py-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center group hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 transition-colors duration-200 ${
      isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : ''
    } ${completed ? 'opacity-75' : ''}`}>
      <div className="sm:col-span-3 flex items-center">
        <button
          onClick={onToggleComplete}
          className={`mr-2 w-5 h-5 rounded border ${
            completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 dark:border-gray-600'
          } flex items-center justify-center transition-colors duration-200`}
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed && <Check className="h-4 w-4" />}
        </button>
        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {time}
          {isCurrent && (
            <span className="ml-2 text-xs bg-blue-500 text-white dark:bg-blue-600 px-2 py-0.5 rounded-full animate-pulse">
              Current
            </span>
          )}
        </span>
      </div>
      
      <div className={`sm:col-span-5 ${completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
        <div className="flex items-center">
          <span className="mr-2">{getIcon()}</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{activity}</span>
        </div>
      </div>
      
      <div className="sm:col-span-4">
        <span className={`text-xs px-2 py-1 rounded-full ${getTypeClasses()}`}>
          {purpose}
        </span>
      </div>
    </div>
  );

  // Get the appropriate background color based on the activity type
  function getTypeClasses() {
    switch (type) {
      case 'focus':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
      case 'wellness':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'meal':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300';
      case 'rest':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300';
      case 'break':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  }
};

export default RoutineItem;