import classNames from 'classnames';
import React, { forwardRef } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  isSquare?: boolean;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      disabled = false,
      onClick,
      isSquare = false,
      children,
      className,
      fullWidth = false,
      fullHeight = false,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={classNames(
        styles.button,
        size && styles[`button--${size}`],
        {
          [styles['button--square']]: isSquare,
          [styles['button--fullHeight']]: fullHeight,
          [styles['button--fullWidth']]: fullWidth,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
