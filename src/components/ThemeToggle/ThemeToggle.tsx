import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '../iconsSVG';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      type="button"
    >
      <span className={styles.icon} aria-hidden>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
};
