import { useEffect, useState } from 'react';
import { THEMES } from '../constants/theme';
import { LOCAL_STORAGE_KEYS } from '../constants/localeStorage';

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.theme);

    return (savedTheme as Theme) || THEMES.light;
  });

  useEffect(() => {
    const page = document.querySelector('.page');

    if (!page) {
      return;
    }

    page.classList.remove(THEMES.light, THEMES.dark);
    page.classList.add(theme);

    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(currentTheme =>
      currentTheme === THEMES.light ? THEMES.dark : THEMES.light,
    );
  }

  return { theme, toggleTheme };
}
