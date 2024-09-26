import { FC } from 'react';

import styles from './ThemeSwitcher.module.scss';
import { useTheme } from '../../../../contexts/ThemeProvider';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';

export const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { moonUrl, sunUrl } = useIconSrc();

  return (
    <button
      type="button"
      className={styles.themeButton}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <img src={moonUrl} className={styles.iconHover} />
      ) : (
        <img src={sunUrl} className={styles.iconHover} />
      )}
    </button>
  );
};
