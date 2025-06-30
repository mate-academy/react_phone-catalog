import React, { useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextProps } from '../types/ThemeType';

export const ThemeContext = React.createContext<ThemeContextProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }

    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    setIsChecked(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isChecked,
        isThemeLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
