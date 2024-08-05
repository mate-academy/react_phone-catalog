import { useEffect, createContext, useState } from 'react';

const initialState = {
  theme: 'dark-theme',
  toggleTheme: () => {},
};

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>(initialState);

const getTheme = () => {
  const theme = localStorage.getItem('theme');

  if (!theme) {
    localStorage.setItem('theme', 'dark-theme');

    return 'dark-theme';
  } else {
    return theme;
  }
};

type Props = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<string>(getTheme);

  const toggleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
