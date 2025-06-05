import React, { useState, useEffect } from 'react';
import RoutineItem from './RoutineItem';
import TimeIndicator from './TimeIndicator';
import ProgressStats from './ProgressStats';
import TabView from './TabView';
import { routineData } from '../data/routineData';
import { RoutineItemType } from '../types/routine';

const RoutineContainer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'routine' | 'progress'>('routine');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`completedRoutineItems-${getCurrentDateKey()}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [activityHistory, setActivityHistory] = useState<Record<string, Record<string, boolean>>>(() => {
    const saved = localStorage.getItem('routineActivityHistory');
    return saved ? JSON.parse(saved) : {};
  });

  function getCurrentDateKey(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = new Date();
      setCurrentTime(newDate);
      
      const currentDateKey = getCurrentDateKey();
      const savedDateKey = localStorage.getItem('currentDateKey');
      
      if (savedDateKey !== currentDateKey) {
        if (savedDateKey && Object.keys(completedItems).length > 0) {
          setActivityHistory(prev => ({
            ...prev,
            [savedDateKey]: completedItems
          }));
        }
        
        setCompletedItems({});
        localStorage.setItem('currentDateKey', currentDateKey);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [completedItems]);

  useEffect(() => {
    const currentDateKey = getCurrentDateKey();
    localStorage.setItem(`completedRoutineItems-${currentDateKey}`, JSON.stringify(completedItems));
    localStorage.setItem('routineActivityHistory', JSON.stringify(activityHistory));
  }, [completedItems, activityHistory]);

  const allItems = routineData.flatMap(section => section.items);

  const sortedItems = allItems.sort((a, b) => {
    const timeA = convertTimeToMinutes(a.time.split('-')[0].trim());
    const timeB = convertTimeToMinutes(b.time.split('-')[0].trim());
    return timeA - timeB;
  });

  function convertTimeToMinutes(timeStr: string): number {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + (minutes || 0);
  }

  const isCurrentItem = (time: string): boolean => {
    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const itemMinutes = convertTimeToMinutes(time.split('-')[0].trim());
    
    return Math.abs(currentMinutes - itemMinutes) < 30;
  };

  const toggleItemCompletion = (item: RoutineItemType) => {
    const itemKey = `${item.time}-${item.activity}`;
    setCompletedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));

    const currentDateKey = getCurrentDateKey();
    setActivityHistory(prev => ({
      ...prev,
      [currentDateKey]: {
        ...prev[currentDateKey],
        [itemKey]: !completedItems[itemKey]
      }
    }));
  };

  const getTodayProgress = () => {
    const total = sortedItems.length;
    const completed = Object.values(completedItems).filter(Boolean).length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const todayProgress = getTodayProgress();

  return (
    <div className="space-y-8">
      <TimeIndicator currentTime={currentTime} progress={todayProgress} />
      <TabView 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        todayProgress={todayProgress}
      />
      
      {activeTab === 'progress' ? (
        <ProgressStats 
          activityHistory={activityHistory} 
          currentDate={currentTime}
          todayProgress={todayProgress}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <div className="sm:col-span-3 font-semibold text-gray-600 dark:text-gray-300">Time</div>
            <div className="sm:col-span-5 font-semibold text-gray-600 dark:text-gray-300">Activity</div>
            <div className="sm:col-span-4 font-semibold text-gray-600 dark:text-gray-300">Purpose</div>
          </div>
          
          <div className="p-4">
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {sortedItems.map((item, index) => {
                const itemKey = `${item.time}-${item.activity}`;
                return (
                  <RoutineItem
                    key={index}
                    time={item.time}
                    activity={item.activity}
                    purpose={item.purpose}
                    type={item.type}
                    isCurrent={isCurrentItem(item.time)}
                    completed={completedItems[itemKey]}
                    onToggleComplete={() => toggleItemCompletion(item)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineContainer;