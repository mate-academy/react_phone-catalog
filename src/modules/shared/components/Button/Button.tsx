import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'large';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isIconOnly?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  radius?: string;
  width?: string;
  height?: string;
  children: ReactNode;
}

export const Button: FC<Props> = ({
  to,
  className,
  isIconOnly = false,
  isSelected = false,
  isDisabled = false,
  variant = 'primary',
  size = 'small',
  radius,
  children,
  width,
  height,
  ...props
}) => {
  const buttonStyles = classNames(
    styles.button,
    styles[size],
    {
      [styles.primary]: variant === 'primary',
      [styles.outline]: variant === 'outline',
      [styles.danger]: variant === 'danger',
      [styles.onlyIcon]: isIconOnly,
      [styles.selected]: isSelected,
    },
    className,
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonStyles}
        style={{ borderRadius: radius, width, height }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={isDisabled}
      className={buttonStyles}
      style={{ borderRadius: radius, width, height }}
      {...props}
    >
      {children}
    </button>
  );
};
