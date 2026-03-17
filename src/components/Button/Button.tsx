import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  pressed?: boolean;
  isActive?: boolean;
};
export const Button: React.FC<Props> = ({
  className = '',
  pressed,
  isActive,
  children,
  ...props
}) => (
  <button
    type="button"
    {...props}

    className={`${styles.button} ${className ? className : ''} ${isActive ? styles.heart : ''}`}
    aria-pressed={pressed}
  >
    {children}
  </button>
);
