import React, { useCallback, useMemo } from 'react';
import { Theme } from '../types/Theme';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Context = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const State: Context = {
  theme: Theme.Light,
  setTheme: () => {},
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext<Context>(State);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', Theme.Light);

  const toggleTheme = useCallback(() => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
