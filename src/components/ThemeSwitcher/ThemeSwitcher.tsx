import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.styles.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.switch}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span
        className={`${styles.thumb} ${theme === 'dark' ? styles.dark : ''}`}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </span>
    </button>
  );
};
