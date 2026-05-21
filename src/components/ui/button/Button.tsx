import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { useTheme } from '@/context/ThemeContext';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'small' | 'normal' | 'large';
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'normal',
  fullWidth = false,
  className,
  ...rest
}) => {
  const { theme } = useTheme();

  const buttonClass = classNames(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],

    {
      [styles['button--fullWidth']]: fullWidth,
      [styles['button--dark']]: theme === 'dark',
      [styles['button--outline--dark']]: theme === 'dark',
    },
    className,
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};
