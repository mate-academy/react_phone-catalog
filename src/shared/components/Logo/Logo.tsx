import { useMemo } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import LogoDark from '@assets/images/logo/logo-dark.svg?react';
import LogoLight from '@assets/images/logo/logo-light.svg?react';

import { DefaultProps } from '@shared/types/common';

import styles from './Logo.module.scss';

type LogoVariant = 'light' | 'dark';

export interface LogoProps extends DefaultProps {
  variant?: LogoVariant;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = 'dark',
  ...rest
}) => {
  const Component = useMemo(
    () =>
      ({
        light: LogoDark,
        dark: LogoLight,
      })[variant],
    [variant],
  );

  return (
    <NavLink to="/" className={cn(styles.logo, className)} {...rest}>
      <Component className={styles.icon} />
    </NavLink>
  );
};
