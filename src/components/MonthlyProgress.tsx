import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calendar } from 'lucide-react';

interface MonthlyProgressProps {
  activityHistory: Record<string, Record<string, boolean>>;
  totalTasks: number;
}

const MonthlyProgress: React.FC<MonthlyProgressProps> = ({ activityHistory, totalTasks }) => {
  const getMonthlyData = () => {
    const monthlyStats: Record<string, { completed: number; days: number }> = {};
    
    Object.entries(activityHistory).forEach(([dateKey, activities]) => {
      const date = new Date(dateKey);
      const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { completed: 0, days: 0 };
      }
      
      const completed = Object.values(activities).filter(Boolean).length;
      monthlyStats[monthKey].completed += completed;
      monthlyStats[monthKey].days += 1;
    });
    
    return Object.entries(monthlyStats).map(([month, stats]) => ({
      name: month,
      value: (stats.completed / (stats.days * totalTasks)) * 100,
      completed: stats.completed,
      total: stats.days * totalTasks,
    }));
  };

  const monthlyData = getMonthlyData();
  const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Monthly Progress Comparison
        </h2>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={monthlyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            >
              {monthlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Completion Rate']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Monthly Details</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {monthlyData.map((month, index) => (
            <div
              key={month.name}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-medium text-gray-800 dark:text-gray-200">{month.name}</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Completed: {month.completed}/{month.total} tasks
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Success Rate: {month.value.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyProgress;