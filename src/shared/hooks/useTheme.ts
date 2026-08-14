import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme');

    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    const root = document.body;

    if (theme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }

    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
