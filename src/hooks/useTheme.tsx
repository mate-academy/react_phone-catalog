import { useContext } from 'react';
import { ThemeContext } from '../store/theme/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: 'light',
      toggleTheme: () => {},
    };
  }

  return context;
};
