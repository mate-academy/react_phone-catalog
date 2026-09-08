import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '../types/types';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    document.body.classList.toggle('theme_dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  return { theme, toggleTheme };
};
