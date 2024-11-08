import { useContext } from 'react';

import { Theme, ThemeContext } from '@context/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = context;

  const color = theme === Theme.DARK ? '#f1f2f9' : '#313237';
  const isNotLightTheme = theme !== Theme.LIGHT;

  return { theme, color, isNotLightTheme, toggleTheme };
};
