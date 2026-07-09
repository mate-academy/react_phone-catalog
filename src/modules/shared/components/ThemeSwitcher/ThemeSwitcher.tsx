import { useTheme } from '../../../../store/theme/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'original-dark';

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Theme</span>
      <button
        type="button"
        className={`${styles.themeSwitcher} ${isDark ? styles.active : ''}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
};
