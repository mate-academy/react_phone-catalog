import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'icon' | 'round';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  selected?: boolean;
  red?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconBadge?: number | string;
  disabled?: boolean;
  noBorder?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  selected,
  red,
  iconLeft,
  iconRight,
  iconBadge,
  className,
  children,
  disabled,
  noBorder,
  ...props
}) => {
  const classes = cn(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    {
      [styles['button--full-width']]: fullWidth,
      [styles['button--disabled']]: disabled,
      [styles['button--selected']]: selected,
      [styles['button--no-border']]: noBorder,
      [styles['button--icon-only']]: variant === 'icon' && !children,
    },
    className,
  );

  return (
    <button className={classes} {...props}>
      {iconLeft &&
        (iconBadge ? (
          <Badge badgeContent={iconBadge} color="error">
            <Icon name={iconLeft} color={red ? 'red' : undefined} />
          </Badge>
        ) : (
          <Icon name={iconLeft} color={red ? 'red' : undefined} />
        ))}
      {children && children}
      {iconRight &&
        (iconBadge ? (
          <Badge badgeContent={iconBadge} color="error">
            <Icon name={iconRight} />
          </Badge>
        ) : (
          <Icon name={iconRight} />
        ))}
    </button>
  );
};
