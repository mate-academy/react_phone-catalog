import React, { createContext, useContext, useEffect } from 'react';
import { THEMES } from '../../components/ThemeSelector';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export type Theme = (typeof THEMES)[number]['id'];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themes, setThemes] = useLocalStorage<Theme>('theme', 'original-light');

  useEffect(() => {
    const allThemeClasses = THEMES.map(theme => theme.id);

    document.body.classList.remove(...(allThemeClasses as string));

    document.body.classList.add(themes as string);
  }, [themes]);

  const value: ThemeContextType = {
    theme: themes,
    setTheme: setThemes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(`useTheme must be used within ThemeProvider`);
  }

  return context;
};
