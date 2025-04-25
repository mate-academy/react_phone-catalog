import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    document.body.classList.toggle('theme_dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return { theme, toggleTheme };
};
