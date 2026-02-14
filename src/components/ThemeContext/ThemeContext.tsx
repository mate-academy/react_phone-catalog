import React, { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeProps = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(() => {
    const activeTheme = localStorage.getItem('theme');

    return activeTheme ? activeTheme : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme ? theme : '');
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used withtin a ThemeProvider');
  }

  return context;
};
