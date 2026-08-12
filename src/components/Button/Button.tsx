import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  isSelected?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  variant = 'primary',
  children,
  isSelected = false,
  fullWidth = false,
  className = '',
  ...props
}: Props) => {
  const buttonClassName = [
    styles.button,
    styles[`button--${variant}`],
    isSelected && styles['button--selected'],
    fullWidth && styles['button--fullWidth'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClassName} type="button" {...props}>
      {children}
    </button>
  );
};
