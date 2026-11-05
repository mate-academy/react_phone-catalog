import { useThemeStore } from '@/shared/store/useThemeStore';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const handleThemeToggle = () => {
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleTheme();
      return;
    }

    document.startViewTransition(() => {
      toggleTheme();
    });
  };

  return (
    <button
      type="button"
      className={styles.themeButton}
      onClick={handleThemeToggle}
      aria-label={
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      }
      title={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      {theme === 'light' ?
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="4"
          />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      : <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path
            d="M20.8 14.4A9 9 0 0 1 9.6 3.2a9 9 0 1 0 11.2 11.2Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      }
    </button>
  );
};
