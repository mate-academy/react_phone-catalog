import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Theme, ThemeContextType } from '../types/Theme';
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');

    return saved === 'dark' ? 'dark' : 'light';
  });
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('color-scheme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
