import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { Theme } from '../../../types/ThemeType';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'orange',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'orange');

  const toggleTheme = () => {
    if (theme === 'orange') {
      setTheme('blue');
    } else if (theme === 'blue') {
      setTheme('purple');
    } else {
      setTheme('orange');
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
