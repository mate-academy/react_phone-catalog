import { createContext, useEffect, useState } from 'react';
import { ThemeAnim } from '../../components/features/ThemeAnim';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });
  const [showWrapper, setShowWrapper] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    document.body.classList.add('locked');
    setShowWrapper(true);
    setShowAnim(false);

    setTimeout(() => {
      setShowAnim(true);
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, 500);

    setTimeout(() => {
      setShowWrapper(false);
      setShowAnim(false);
      document.body.classList.remove('locked');
    }, 1500);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <ThemeAnim showWrapper={showWrapper} />
    </ThemeContext.Provider>
  );
};
