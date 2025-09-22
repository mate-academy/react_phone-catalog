/* eslint-disable jsx-a11y/label-has-for */
import { useContext } from 'react';
import { ThemeContext } from '../Themes';
import styles from './Switcher.module.scss';

export const Switcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={styles.headerContent}>
      <div className={`${styles.toggleBtnSection} ${styles[theme]}`}>
        <div className={styles.toggleCheckbox}>
          <input
            type="checkbox"
            id="theme-switch"
            className={styles.toggleBtnInput}
            onChange={handleThemeChange}
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
