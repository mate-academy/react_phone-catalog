import { createContext, useContext, useMemo, useEffect } from 'react';
import { useLocalStorage } from '../hooks';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
