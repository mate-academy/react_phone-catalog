import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }

    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-btn"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️ Світла тема' : '🌙 Темна тема'}
    </button>
  );
};
