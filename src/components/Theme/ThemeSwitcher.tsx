import './ThemeSwitcher';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="themeSwitcher">
      {theme === 'light' ? (
        <FaMoon className="themeSwitcher__button" />
      ) : (
        <FaSun className="themeSwitcher__button" />
      )}
    </button>
  );
};
