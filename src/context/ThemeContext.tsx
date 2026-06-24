import React, { useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    JSON.parse(localStorage.getItem('theme') || '"light"'),
  );

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));

    const root = document.documentElement;

    requestAnimationFrame(() => {
      if (theme === 'dark') {
        root.style.setProperty('--page-color', '#181A1B');
        root.style.setProperty('--primary-color', '#F3F3F3');
        root.style.setProperty('--secondary-color', '#B4BDC3');
        root.style.setProperty('--elements-color', '#23272A');
        root.style.setProperty('--accent', '#8B5CF6');
        root.style.setProperty('--icons-color', '#B4BDC3');
        root.style.setProperty('--white-color', '#393d42');
        root.style.setProperty('--button-color', 'black');
      } else {
        root.style.setProperty('--page-color', '#FAFBFC');
        root.style.setProperty('--primary-color', '#0F0F11');
        root.style.setProperty('--secondary-color', '#89939A');
        root.style.setProperty('--elements-color', '#e2e6e9');
        root.style.setProperty('--accent', '#4219d0');
        root.style.setProperty('--icons-color', '#B4BDC3');
        root.style.setProperty('--white-color', '#FFF');
        root.style.setProperty('--button-color', '#FFF');
      }
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
