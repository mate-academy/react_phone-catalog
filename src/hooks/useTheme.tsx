import { useCallback, useEffect } from "react";
import { Theme } from "../types/Theme"
import { useLocalStorage } from "./useLocalStorage"

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return { theme, toggleTheme };
};
