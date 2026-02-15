import { useEffect, useState } from 'react';

export type Themes = 'light' | 'dark';

export const useProjectTheme = () => {
  const [theme, setTheme] = useState<Themes>(() => {
    return (localStorage.getItem('theme') as Themes) || 'light';
  });

  useEffect(() => {
    const rootElement = document.documentElement;

    if (theme === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
