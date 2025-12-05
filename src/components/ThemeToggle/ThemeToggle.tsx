import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';
import SunIcon from '../../assets/img/Sun-white.svg?react';
import MoonIcon from '../../assets/img/Moon-dark.svg?react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
