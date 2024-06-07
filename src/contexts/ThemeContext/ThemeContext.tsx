import React, { createContext, useEffect, useState } from 'react';

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light',
}

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const initial = {
  theme: ThemeType.LIGHT,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initial);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('theme') as ThemeType) || ThemeType.LIGHT;
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current =>
      current === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
