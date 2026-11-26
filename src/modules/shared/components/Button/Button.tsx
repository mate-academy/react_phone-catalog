import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'slider';
  size?: 'default' | 'small';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const classNameComposed = classNames(
      styles.button,
      styles[variant],
      styles[size],
      className,
      { [styles.disabled]: disabled },
    );

    return (
      <button
        ref={ref}
        className={classNameComposed}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
