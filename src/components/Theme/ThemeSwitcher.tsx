import './ThemeSwitcher.scss';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="themeSwitcher">
      <button onClick={toggleTheme} className="themeSwitcher__button">
        {theme === 'light' ? (
          <FaMoon className="icon" />
        ) : (
          <FaSun className="icon icon--white" />
        )}
      </button>
    </div>
  );
};
