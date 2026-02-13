import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Завантаження теми з локального сховища або дефолтної
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    // Додаємо відповідний клас до HTML
    document.documentElement.className = theme;
    // Зберігаємо вибір теми в локальному сховищі
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
