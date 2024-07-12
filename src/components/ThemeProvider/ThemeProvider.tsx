import { useState } from 'react';
import React from 'react';

export const ThemeContext = React.createContext({
  light: true,
  toggleTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [light, setLight] = useState(true);

  const toggleTheme = () => {
    setLight(prev => !prev);
  };

  const value = { light, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
