import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from '../types/ThemeType';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

type Props = {
  children: React.ReactNode;
};

const getInitialTheme = (): ThemeType => {
  const savedTheme = localStorage.getItem('theme');

  return savedTheme === ThemeType.DARK ? ThemeType.DARK : ThemeType.LIGHT;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
