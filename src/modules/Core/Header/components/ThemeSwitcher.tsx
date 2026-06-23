import React from 'react';

import { useTheme } from '../../../../hooks/useTheme';
import { ThemeIcon } from '../../../../components/Icons/ThemeIcon';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.button} onClick={toggleTheme}>
      <span className={styles.icon}>
        {theme === 'light' ? (
          <ThemeIcon theme="dark" />
        ) : (
          <ThemeIcon theme="light" />
        )}
      </span>
    </button>
  );
};
