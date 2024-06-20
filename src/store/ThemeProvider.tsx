import React, { createContext, useEffect, useState } from 'react';
import { Props } from '../types/ContextType/Props';

const ThemeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
