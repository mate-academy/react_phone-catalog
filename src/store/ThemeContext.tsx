import { createContext, ReactNode } from 'react';
import { useThemeStorage } from '../utils/hooks/Storage/useThemeStorage';

type ThemeType = ReturnType<typeof useThemeStorage>;

export const ThemeContext = createContext<ThemeType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const data = useThemeStorage();

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};
