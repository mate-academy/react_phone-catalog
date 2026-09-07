import { useContext } from 'react';
import { ThemeContext } from '../../store/ProviderTheme';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('Theme context error');
  }

  return ctx;
};
