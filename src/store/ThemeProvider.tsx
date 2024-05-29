import React, { createContext, useState } from 'react';
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
