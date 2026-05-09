import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

const getInitial = (stored: Theme | null): Theme => {
  if (stored) return stored;
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [stored, setStored] = useLocalStorage<Theme | null>('theme', null);
  const theme = getInitial(stored);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const set = useCallback((t: Theme) => setStored(t), [setStored]);
  const toggle = useCallback(
    () => setStored(theme === 'light' ? 'dark' : 'light'),
    [theme, setStored],
  );

  const value = useMemo<ThemeState>(
    () => ({ theme, toggle, set }),
    [theme, toggle, set],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
