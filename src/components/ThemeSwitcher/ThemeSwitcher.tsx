import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.switcher}>
      {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
    </button>
  );
};
