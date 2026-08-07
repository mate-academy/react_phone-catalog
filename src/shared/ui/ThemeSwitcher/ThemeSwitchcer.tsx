import classNames from 'classnames';
import React from 'react';

import styles from './ThemeSwitcher.module.scss';
import IconSun from '@public/img/theme/sun.svg?react';
import IconMoon from '@public/img/theme/moon.svg?react';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import { toggleTheme } from '@src/features/theme';

export const ThemeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);

  return (
    <button
      type="button"
      className={styles.themeSwitch}
      onClick={() => dispatch(toggleTheme())}
    >
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
