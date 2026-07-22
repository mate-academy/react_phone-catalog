import classNames from 'classnames';

import React from 'react';
import styles from './ThemeSwitcher.module.scss';
import IconSun from '@public/img/theme/sun.svg?react';
import IconMoon from '@public/img/theme/moon.svg?react';
import { useTheme } from '@shared/context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className={styles.themeSwitch} onClick={toggleTheme}>
      <IconSun className={styles.themeSwitchIcon} />

      <span
        className={classNames(styles.themeSwitchThumb, {
          [styles.themeSwitchThumbActive]: theme === 'dark',
        })}
      />

      <IconMoon className={styles.themeSwitchIcon} />
    </button>
  );
};
