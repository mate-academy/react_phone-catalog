import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.',
    );
  }

  return context;
};
