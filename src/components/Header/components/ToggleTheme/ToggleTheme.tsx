import React from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import styles from './ToggleTheme.module.scss';

export const ToggleTheme: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.themeButton}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
