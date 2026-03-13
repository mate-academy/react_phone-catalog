import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type Context = {
  theme: Theme;
  themeToggle: () => void;
};

const ThemeContext = createContext<Context | undefined>(undefined);

export const ThemeProvaider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saveTheme = localStorage.getItem('theme') || 'light';

    if (saveTheme === 'dark' || saveTheme === 'light') {
      return saveTheme;
    }

    return 'light';
  });

  const themeToggle = () =>
    setTheme(prevThem => (prevThem === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const contex = useContext(ThemeContext);

  if (!contex) {
    throw new Error('you should use ThemeProvaider');
  }

  return contex;
};
