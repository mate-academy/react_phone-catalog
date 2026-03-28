import React from 'react';
import styles from './Button.module.scss';
import { cn } from '@/utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  classNames?: string;
  animation?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const Button: React.FC<ButtonProps> = ({
  children,
  classNames = '',
  animation = true,
  variant = 'ghost',
  type = 'button',
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        styles.button,
        styles[variant],
        { [styles.buttonAnimated]: animation },
        classNames,
      )}
    >
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default Button;
