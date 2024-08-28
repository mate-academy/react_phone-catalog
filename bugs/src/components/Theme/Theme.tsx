import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './Theme.module.scss'

export const Theme: React.FC = () => {

  let { theme, setTheme } = useAppContext();

  const handleThemeChange = () => {
    if (theme === 'light') {
      theme = 'dark'
    } else theme = 'light';

    setTheme(theme);
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.navItem} onClick={handleThemeChange}>
      {theme}
    </div>
  );
};
