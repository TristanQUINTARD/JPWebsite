import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  const setMode = (mode: 'light' | 'dark') => {
    window.localStorage.setItem('theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (localTheme) {
      setMode(localTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  return { theme, toggleTheme };
};