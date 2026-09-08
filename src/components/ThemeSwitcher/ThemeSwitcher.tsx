import React from 'react';
import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  theme,
  toggleTheme,
}) => {
  const inputId = 'theme-switcher';

  return (
    <div className={styles.switcher}>
      <label htmlFor={inputId} className={styles.toggle}>
        {/* Спрятанный текст */}
        <span className={styles.visuallyHidden}>Toggle theme</span>
        <input
          id={inputId}
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
