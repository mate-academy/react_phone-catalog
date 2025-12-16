import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  variant?: 'primary' | 'secundary' | 'transparent' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  'data-testid'?: string;
  ariaLabel?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  text,
  variant = 'primary',
  size = 'md',
  className = '',
  'data-testid': dataTestId,
  ariaLabel,
  type = 'button',
  onClick,
  ...rest
}) => {
  const content = children ?? text;
  const classes =
    `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
