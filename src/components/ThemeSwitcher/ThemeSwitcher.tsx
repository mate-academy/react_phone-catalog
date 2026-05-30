import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`${styles.themeSwitcher} ${theme === 'dark' ? styles.dark : styles.light}`} onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} type="button">
      <span className={styles.track}>
        {/* Show the word based on what you'll switch TO */}
        <span className={styles.label}>{theme === 'light' ? 'Dark' : 'Light'}</span>

        {/* Thumb (circle) with icon - moves left/right */}
        <span className={styles.thumb}>
          {theme === 'light' ? (
            // Light mode: light circle with dark moon on LEFT
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Dark mode: dark circle with light sun on RIGHT
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </span>
      </span>
    </button>
  );
};
