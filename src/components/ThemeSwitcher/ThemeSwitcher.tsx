import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <div className={styles.container}>
      <span className={styles.span}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={switchTheme}
          checked={theme === 'dark'}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'}`}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
