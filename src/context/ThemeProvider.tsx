import { ReactNode, createContext, useEffect, useState } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === Theme.LIGHT || storedTheme === Theme.DARK
      ? (storedTheme as Theme)
      : Theme.LIGHT;
  });

  useEffect(() => {
    document.body.classList.remove(Theme.LIGHT, Theme.DARK);
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? Theme.DARK
      : Theme.LIGHT;

    if (!localStorage.getItem('theme')) {
      setTheme(systemTheme);
    }
  }, []);

  const toggleTheme = () =>
    setTheme(prevTheme =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
