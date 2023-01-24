import {
  createContext, FC,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ContextProps = {
  theme: 'light' | 'dark',
  onThemeChange: () => void,
  isThemeDark: boolean,
};

export const ThemeContext = createContext<ContextProps>({
  theme: 'light',
  onThemeChange: () => { },
  isThemeDark: false,
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const isThemeDark = theme === 'dark';

  const contextValue = {
    theme,
    onThemeChange: handleThemeChange,
    isThemeDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
