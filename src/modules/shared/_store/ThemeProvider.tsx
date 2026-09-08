import { createContext, useEffect, useState } from 'react';
import { Themes } from '../../../_types/themes';
import { getStoredItems } from '../../../_utils/getStoredItems';

export const ThemeContext = createContext({
  theme: Themes.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() =>
    getStoredItems('theme', Themes.light),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', 'theme');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === Themes.light ? Themes.dark : Themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
