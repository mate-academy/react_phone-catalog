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
    const slider = document.getElementById('slider') as HTMLInputElement;
    if (theme && theme === 'dark') {
      if (slider) {
        slider.checked = false
      }
    } else {
      if (slider) {
        slider.checked = true;
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used withtin a ThemeProvider');
  }

  return context;
};
