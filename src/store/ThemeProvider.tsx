import React, { createContext, useState } from 'react';
import { Props } from '../types/ContextType/Props';

enum Theme {
  dark = 'dark-theme',
  light = 'light-theme',
}

const ThemeContext = createContext({
  theme: Theme.light,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.light);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      switch (prevTheme) {
        case Theme.light:
          return Theme.dark;
        case Theme.dark:
          return Theme.light;
        default:
          return Theme.light;
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
