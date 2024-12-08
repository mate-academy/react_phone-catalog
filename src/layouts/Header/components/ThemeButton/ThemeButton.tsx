import { useMemo } from 'react';

import cn from 'classnames';

import MoonIcon from '@assets/images/icons/moon-icon.svg?react';
import SunIcon from '@assets/images/icons/sun-icon.svg?react';

import { useTheme } from '@shared/contexts/Theme.context';
import { DefaultProps } from '@shared/types/common';

import styles from './ThemeButton.module.scss';

interface ThemeButtonProps extends DefaultProps {}

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  className,
  ...rest
}) => {
  const { theme, onToggleTheme } = useTheme();

  const Icon = useMemo(() => {
    if (theme === 'light') {
      return MoonIcon;
    }

    return SunIcon;
  }, [theme]);

  return (
    <button
      className={cn(styles.themeButton, className)}
      onClick={onToggleTheme}
      {...rest}
    >
      <Icon />
    </button>
  );
};
