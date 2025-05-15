import React from 'react';
import classNames from 'classnames';

import { ThemeType } from '../../types';
import { useTheme } from '../../hooks';

import { MoonIcon, SunIcon } from '../icons';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light);
  };

  const isLight = theme === ThemeType.Light;

  return (
    <button
      onClick={toggleTheme}
      className={classNames(styles['theme-switcher'])}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
