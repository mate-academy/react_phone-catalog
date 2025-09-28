/* eslint-disable jsx-a11y/label-has-for */
import { useTheme } from '../Themes';
import styles from './Switcher.module.scss';

export const Switcher = () => {
  const { theme, toggleTheme } = useTheme();

  // const handleThemeChange = () => {
  //   const newTheme = theme === 'dark' ? 'light' : 'dark';

  //   toggleTheme(newTheme);
  //   localStorage.setItem('theme', newTheme);
  // };

  return (
    <div className={styles.headerContent}>
      <div className={`${styles.toggleBtnSection} ${styles[theme]}`}>
        <div className={styles.toggleCheckbox}>
          <input
            type="checkbox"
            id="theme-switch"
            className={styles.toggleBtnInput}
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <label
            htmlFor="theme-switch"
            className={styles.toggleBtnLabel}
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </div>
  );
};
