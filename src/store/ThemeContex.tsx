import React, { useMemo, useState } from 'react';
import { Theme } from '../types/Theme';

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
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === Theme.Light ? Theme.Dark : Theme.Light,
    );
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
