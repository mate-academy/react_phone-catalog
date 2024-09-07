import { FC } from 'react';

import styles from './ThemeSwitcher.module.scss';
import { useTheme } from '../../../../context/ThemeProvider';

type Props = {};

export const ThemeSwitcher: FC<Props> = ({}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.themeButton}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
