import { useTranslation } from '../../hooks';
import { toggleTheme } from '../../store/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const theme = useAppSelector(state => state.theme.mode);

  const isDarkTheme = theme === 'dark';
  const label = isDarkTheme
    ? t.common.theme.switchToLight
    : t.common.theme.switchToDark;

  return (
    <button
      className={styles.themeToggleBtn}
      type="button"
      aria-label={label}
      aria-pressed={isDarkTheme}
      title={label}
      onClick={() => dispatch(toggleTheme())}
    >
      <svg
        className={`${styles.icon} ${styles.sunIcon}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="5" />

        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42
         1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        />
      </svg>

      <svg
        className={`${styles.icon} ${styles.moonIcon}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};
