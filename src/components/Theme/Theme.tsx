import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './Theme.module.scss';

export const Theme: React.FC = () => {
  let { theme, setTheme } = useAppContext();

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    } else {
      setTheme('light');
    }
  }, [setTheme]);

  return (
    <div className={styles.navItem} onClick={handleThemeChange}>
      {theme}
    </div>
  );
};
