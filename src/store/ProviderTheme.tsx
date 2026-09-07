import React, { PropsWithChildren, useEffect, useLayoutEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface InitialThemeContext {
  theme: 'light' | 'dark';
  toogleTheme: () => void;
}

export const ThemeContext = React.createContext<InitialThemeContext | null>(
  null,
);

const getInitialTheme = (): 'light' | 'dark' => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isDarkTheme ? 'dark' : 'light';
};

export const ProviderTheme: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
    'theme',
    getInitialTheme(),
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toogleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const value: InitialThemeContext = {
    theme: theme,
    toogleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
