/* eslint-disable @typescript-eslint/indent */
import { useEffect } from 'react';
import { THEME_KEY } from '../../../constants/localStorages';

import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

export function useThemeStorage() {
  const { value: currentTheme, setValue: setCurrentTheme } =
    useLocalStorage<Theme>(THEME_KEY, 'light');

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  return {
    currentTheme,
    toggleTheme,
  };
}
