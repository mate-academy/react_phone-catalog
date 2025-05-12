import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '../types/Theme';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return { theme, toggleTheme };
};
