import { type FC } from 'react';
import { useThemeStore } from '../../../store/themeStore';

import styles from './ThemeSwitcher.module.scss';

import LightThemeIcon from '/icons/light-theme.svg';
import DarkThemeIcon from '/icons/dark-theme.svg';

export const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  const iconSrc = theme === 'dark' ? LightThemeIcon : DarkThemeIcon;
  const iconAlt =
    theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeSwitcher}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        className={styles.themeIcon}
      />
    </button>
  );
};
