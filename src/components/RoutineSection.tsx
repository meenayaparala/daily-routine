import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import RoutineItem from './RoutineItem';
import { RoutineItemType } from '../types/routine';

interface RoutineSectionProps {
  title: string;
  emoji: string;
  color: string;
  items: RoutineItemType[];
  isCurrentSection: boolean;
  defaultExpanded?: boolean;
}

const RoutineSection: React.FC<RoutineSectionProps> = ({
  title,
  emoji,
  color,
  items,
  isCurrentSection,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  // Update expanded state when isCurrentSection changes
  useEffect(() => {
    if (isCurrentSection) {
      setExpanded(true);
    }
  }, [isCurrentSection]);

  // Get the appropriate color classes based on the color prop
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, { bg: string, border: string, text: string, hover: string }> = {
      blue: { 
        bg: 'bg-blue-50 dark:bg-blue-900/20', 
        border: 'border-blue-200 dark:border-blue-700', 
        text: 'text-blue-500 dark:text-blue-400',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
      },
      green: { 
        bg: 'bg-green-50 dark:bg-green-900/20', 
        border: 'border-green-200 dark:border-green-700', 
        text: 'text-green-500 dark:text-green-400',
        hover: 'hover:bg-green-100 dark:hover:bg-green-900/30'
      },
      amber: { 
        bg: 'bg-amber-50 dark:bg-amber-900/20', 
        border: 'border-amber-200 dark:border-amber-700', 
        text: 'text-amber-500 dark:text-amber-400',
        hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/30'
      },
      purple: { 
        bg: 'bg-purple-50 dark:bg-purple-900/20', 
        border: 'border-purple-200 dark:border-purple-700', 
        text: 'text-purple-500 dark:text-purple-400',
        hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
      },
      indigo: { 
        bg: 'bg-indigo-50 dark:bg-indigo-900/20', 
        border: 'border-indigo-200 dark:border-indigo-700', 
        text: 'text-indigo-500 dark:text-indigo-400',
        hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
      },
    };

    return colorMap[colorName] || colorMap.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div 
      className={`rounded-xl border shadow-sm transition-all duration-300 overflow-hidden ${colorClasses.border} ${
        isCurrentSection ? 'ring-2 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900 ' + colorClasses.text.replace('text-', 'ring-') : ''
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between p-4 ${colorClasses.bg} ${colorClasses.hover} transition-colors duration-200`}
        aria-expanded={expanded}
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">{emoji}</span>
          <h2 className={`text-xl font-semibold ${isCurrentSection ? colorClasses.text : 'text-gray-800 dark:text-gray-200'}`}>
            {title}
            {isCurrentSection && (
              <span className="ml-3 text-sm font-normal bg-blue-500 text-white dark:bg-blue-600 px-2 py-0.5 rounded-full animate-pulse">
                Current
              </span>
            )}
          </h2>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {expanded && (
        <div className="p-4 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
          {items.map((item, index) => (
            <RoutineItem 
              key={index} 
              time={item.time} 
              activity={item.activity} 
              purpose={item.purpose} 
              type={item.type} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutineSection;