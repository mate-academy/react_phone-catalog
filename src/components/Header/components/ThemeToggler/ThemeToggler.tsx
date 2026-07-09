import { useTheme } from '../../../../modules/shared/context/ThemeContext';
import styles from './ThemeToggler.module.scss';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`${styles.themeToggler} ${styles[theme]}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className={styles.themeTogglerCircle}>
        {theme === 'light' ? (
          <span className={styles.icon}>☀️</span>
        ) : (
          <span className={styles.icon}>🌙</span>
        )}
      </div>
    </button>
  );
};
