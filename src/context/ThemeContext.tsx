import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Props = {
  children: ReactNode;
};

type ThemeContextType = {
  themeColor: 'light' | 'dark';
  setThemeColor: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('themeColor') as 'light' | 'dark';

    if (savedTheme) {
      return savedTheme;
    } else {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    if (themeColor === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
