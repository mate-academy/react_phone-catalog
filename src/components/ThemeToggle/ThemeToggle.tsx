import classNames from 'classnames';
import { useTheme } from '../../modules/shared/context/ThemeContext';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={classNames(styles.toggle, {
        [styles.toggleActive]: theme === 'dark',
      })}
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <span className={styles.icon}>
        <i
          className={theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}
        />
      </span>
      <span className={styles.label}>{theme === 'dark' ? 'Night' : 'Day'}</span>
    </button>
  );
};
