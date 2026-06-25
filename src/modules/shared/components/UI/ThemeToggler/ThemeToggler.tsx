import { useTheme } from '../../../../../contexts/ThemeContext';
import styles from './ThemeToggler.module.scss';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.togglerWrapper}>
      <button
        className={styles.toggler}
        aria-label="Toggle theme"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className={styles.icon}>{theme === 'light' ? '🌙' : '☀️'}</span>
      </button>
    </div>
  );
};
