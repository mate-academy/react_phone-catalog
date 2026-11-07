import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    return storedTheme === 'dark' || (!storedTheme && prefersDark);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className=" w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] flex items-center justify-center hover:bg-elements dark:bg-primary dark:hover:bg-icons text-primary dark:text-white transition-colors cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};
