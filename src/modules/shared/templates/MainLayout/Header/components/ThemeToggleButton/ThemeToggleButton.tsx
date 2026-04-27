import React from 'react';
import styles from './ThemeToggleButton.module.scss';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../../../atoms/Icon';
import { MoonIcon } from '../../../../../../../assets/icons/moon-icon';
import { SunIcon } from '../../../../../../../assets/icons/sun-icon';
import { Theme } from '../../../../../../../enums/Theme';
import { setTheme } from '../../../../../../../features/themeSlice';
import { useAppSelector } from '../../../../../../../hooks/hooks';
import { IconButton } from '../../../../../atoms/IconButton';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const ThemeToggleButton: React.FC<Props> = ({ className }) => {
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark));
  };

  return (
    <IconButton
      className={classNames(styles.icon, className)}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      fullHeight
    >
      <Icon color="primary">
        {theme === Theme.Dark ? <MoonIcon /> : <SunIcon />}
      </Icon>
    </IconButton>
  );
};
