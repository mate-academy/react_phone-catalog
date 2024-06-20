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
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
