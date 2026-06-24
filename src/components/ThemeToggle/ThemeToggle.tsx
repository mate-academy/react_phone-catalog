import styles from './ThemeToggle.module.scss';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../Icon';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggle}>
      <input
        type="checkbox"
        id="theme-toggle"
        className={styles.toggleInput}
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />
      <label
        htmlFor="theme-toggle"
        className={styles.toggleLabel}
        aria-label="Toggle theme"
      >
        <span className={styles.toggleCircle}>
          <Icon name="theme" className={styles.toggleIcon} />
        </span>
      </label>
    </div>
  );
};
