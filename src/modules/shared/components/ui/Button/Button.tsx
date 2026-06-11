/* eslint-disable prettier/prettier */

//#region IMPORTS
import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';
//#endregion IMPORTS

//#region TYPES
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'icon' | 'action';
  isSelected?: boolean;
}
//#endregion TYPES

export const Button = ({
  children,
  variant = 'primary',
  isSelected = false,
  className = '',
  ...props
}: ButtonProps) => {
  //#region RENDER
  const buttonClasses = [
    styles.button,
    styles[variant],
    isSelected ? styles.selected : '',
    className,
  ]
    .join(' ')
    .trim();

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
  //#endregion RENDER
};
