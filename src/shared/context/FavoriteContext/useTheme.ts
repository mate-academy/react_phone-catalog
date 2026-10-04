import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';

export const useTheme = () => {
  return useContext(ThemeContext);
};
