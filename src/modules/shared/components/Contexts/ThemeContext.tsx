import React, { useContext, useEffect } from 'react';
import { Theme } from '../../types/enums';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type HandleThemeChange = (newTheme: Theme) => void;

type ThemeContextValue = {
  theme: Theme;
  handleThemeChange: HandleThemeChange;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

type Props = React.PropsWithChildren;

const getBrowserTheme = (): Theme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.Dark
    : Theme.Bright;
};

const themeKey = 'theme';

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage<Theme>(themeKey, getBrowserTheme());

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute(themeKey, theme);
  }, [theme]);

  const value = {
    theme,
    handleThemeChange,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('ThemeProvider is missing!!!');
  }

  return value;
};
