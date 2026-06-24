import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'theme';

function getSystemTheme(): Theme | null {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return null;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function readSavedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);

    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function applyThemeToDocument(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const saved = readSavedTheme();

    if (saved) {
      return saved;
    }

    const system = getSystemTheme();

    if (system) {
      return system;
    }

    return defaultTheme;
  });

  useEffect(() => {
    applyThemeToDocument(theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    };
  }, [theme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return ctx;
}
