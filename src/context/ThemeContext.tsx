import React, { useEffect, useState, createContext, useContext } from 'react';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

type Props = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  switchTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.Light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme(currTheme =>
      currTheme === Theme.Light ? Theme.Dark : Theme.Light,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
