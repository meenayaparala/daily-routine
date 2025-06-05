import React from 'react';
import Header from './components/Header';
import RoutineContainer from './components/RoutineContainer';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header />
          <main className="mt-8">
            <RoutineContainer />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;