import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '../types/Theme';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  return { theme, toggleTheme };
};
