/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';

import styles from './ThemeSwitcher.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { useTheme } from '../../hooks/useTheme';
import { themeActions } from '../../store/theme/themeSlice';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const isDark = useTheme();

  return (
    <label
      htmlFor="theme"
      className={cn(styles['theme-switcher'], {
        [styles['theme-switcher--active']]: isDark,
      })}
    >
      <span className={styles['theme-switcher__box']}></span>
      <input
        id="theme"
        type="checkbox"
        onChange={() => {
          dispatch(themeActions.toggleTheme());
        }}
        className={styles['theme-switcher__input']}
      />
    </label>
  );
};
