import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} My Daily Routine
        </p>
        <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
          <p>Designed for better productivity and wellness</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;