import { useState, useEffect } from 'react';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('leadflow-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('leadflow-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return { darkMode, toggleTheme };
};

export default useTheme;
