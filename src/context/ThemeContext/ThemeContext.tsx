import React, { createContext, useState, useContext, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const load = localStorage.getItem('theme');
    if (load === 'light' || load === 'dark') {
      setTheme(load);
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'lightTheme' : 'darkTheme'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if(!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

