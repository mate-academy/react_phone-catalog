import { useEffect, useState } from 'react';

import { LocalStorage } from '@shared/services/LocalStorage';
import { contextFactory } from '@shared/utils/contextFactory';

interface ThemeProps {
  children: React.ReactNode;
}

interface Theme {
  theme: 'light' | 'dark';
  onToggleTheme: VoidFunction;
}

const initialValue: Theme = {
  theme: 'light',
  onToggleTheme: () => {},
};

const getOppositeTheme = (theme: Theme['theme']) => {
  if (theme === 'light') {
    return 'dark';
  }

  return 'light';
};

const { context: ThemeContext, useContext: useTheme } = contextFactory<Theme>({
  initialValue,
});

const ThemeProvider = ({ children }: ThemeProps) => {
  const currentTheme = LocalStorage.getItem<Theme['theme']>('theme') ?? 'light';

  const [theme, setTheme] = useState<Theme['theme']>(currentTheme);

  const onToggleTheme = () => {
    setTheme(prev => {
      const newTheme = getOppositeTheme(prev);

      LocalStorage.setItem('theme', newTheme);

      return newTheme;
    });
  };

  useEffect(() => {
    document.body.classList.remove(getOppositeTheme(theme));
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, onToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
