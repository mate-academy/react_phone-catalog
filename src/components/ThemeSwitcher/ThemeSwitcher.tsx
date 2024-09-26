import React, { useContext, useEffect, useState } from 'react';
import '@theme-toggles/react/css/Classic.css';
import { Classic } from '@theme-toggles/react';
import { FavoritesContext } from '../../context/FavoritesContext';
import './ThemeSwitcher.scss';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useContext(FavoritesContext);
  const [switcherSettings, setSwitcherSettings] = useState({
    width: '64px',
    height: '64px',
    color: 'orange',
    fontSize: '24px',
    borderLeft: '1px solid #E2E6E9',
  });
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  const updateSwitcherSettings = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1200) {
      setSwitcherSettings({
        width: '48px',
        height: '48px',
        color: 'orange',
        fontSize: '24px',
        borderLeft: '1px solid #E2E6E9',
      });
    } else {
      setSwitcherSettings({
        width: '64px',
        height: '64px',
        color: 'orange',
        fontSize: '24px',
        borderLeft: '1px solid #E2E6E9',
      });
    }
  };

  useEffect(() => {
    updateSwitcherSettings();
    window.addEventListener('resize', updateSwitcherSettings);

    return () => {
      window.removeEventListener('resize', updateSwitcherSettings);
    };
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };



  return (
  
      <Classic
        style={switcherSettings}
        toggled={isDarkMode}
        onToggle={handleToggleTheme}
        duration={250}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    
  );
};

export default ThemeSwitcher;
