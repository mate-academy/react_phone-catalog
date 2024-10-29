import { createContext, useEffect, useState } from 'react';
import { Theme } from '../utils/constants';

const initialState = {
  theme: Theme.LIGTH,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_theme: Theme) => {},
};

export const ThemeContext = createContext(initialState);

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const initialTheme = (localStorage.getItem('theme') as Theme) || Theme.LIGTH;

  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
