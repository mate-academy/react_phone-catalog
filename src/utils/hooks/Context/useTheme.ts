import { useContext } from 'react';
import { ThemeContext } from '../../../store/ThemeContext';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }

  return ctx;
};
