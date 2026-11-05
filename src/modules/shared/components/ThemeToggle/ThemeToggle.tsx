import { useEffect } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import styles from './ThemeToggle.module.scss';
import classNames from 'classnames';

type Theme = 'dark' | 'light';

export const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={styles.themeToggle}>
      <button
        type="button"
        aria-label="Darck theme"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={classNames(styles.themeToggleButton, {
          [styles.themeToggleButtonActive]: theme === 'dark',
        })}
      >
        <span className={styles.themeToggleIconMoon} />
      </button>
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
        className={classNames(styles.themeToggleButton, {
          [styles.themeToggleButtonActive]: theme === 'light',
        })}
      >
        <span className={styles.themeToggleIconSun} />
      </button>
    </div>
  );
};
