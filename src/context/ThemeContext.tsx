// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, ThemeEnum } from '../types/Theme';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: ThemeEnum.Light,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(ThemeEnum.Light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme | null;

    if (savedTheme === ThemeEnum.Dark || savedTheme === ThemeEnum.Light) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(ThemeEnum.Light, ThemeEnum.Dark);
    document.documentElement.classList.add(theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev =>
      prev === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
