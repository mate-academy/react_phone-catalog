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
    <div className={styles.toggleContainer} onClick={handleThemeChange}>
      <div className={styles.labelContainer}>
        {theme === 'dark' && <div className={styles.label}>LIGHT</div>}
        {theme === 'light' && <div className={styles.label}>DARK</div>}
      </div>

      <div className={`${theme === 'light' ? styles.bcgWrapperLight :  styles.bcgWrapperDark}`}>
        <div className={styles.circle} />
        <div className={styles.rectangle} />
        <div className={styles.circle} />
      </div>

      <div className={`${styles.button} ${theme === "light" ? styles.modeLight  : styles.modeDark}`} />
    </div>
  );
};
