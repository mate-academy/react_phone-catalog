import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Theme } from '../../types/Theme';

type Props = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const themes = [
  { value: 'original', label: 'Оригінальний' },
  { value: 'original-dark', label: 'Оригінальний темний' },
  { value: 'rounded-blue', label: 'Округлий синій' },
  { value: 'rounded-purple', label: 'Округлий фіолетовий' },
  { value: 'rounded-orange', label: 'Округлий помаранчевий' },
] as const;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    return savedTheme || 'original';
  });

  useEffect(() => {
    document.body.classList.remove(
      'theme-original',
      'theme-original-dark',
      'theme-rounded-blue',
      'theme-rounded-purple',
      'theme-rounded-orange',
    );
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
