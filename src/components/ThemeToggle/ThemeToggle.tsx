import styles from './ThemeToggle.module.scss';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <div className={styles.themeToggle}>
      <input
        type="checkbox"
        id="theme-toggle"
        className={styles.toggleInput}
        onChange={toggleTheme}
        checked={isDarkTheme}
      />

      <label htmlFor="theme-toggle" className={styles.toggleLabel}>
        <span className={styles.toggleCircle}></span>
      </label>
    </div>
  );
};
