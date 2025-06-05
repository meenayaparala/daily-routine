import React from 'react';
import { AlarmClock, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center mb-4 sm:mb-0">
        <AlarmClock className="h-8 w-8 text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Daily Routine
        </h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="flex items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <>
            <Sun className="h-5 w-5 mr-2" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5 mr-2" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
};

export default Header;