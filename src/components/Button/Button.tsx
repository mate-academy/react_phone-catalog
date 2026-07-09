import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pagination' | 'slider' | 'favorite';
  selected?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  selected = false,
  className: customClassName,
  ...props
}) => {
  const combinedClassName = classNames(
    styles.button,
    styles[variant],
    'buttons',
    { [styles.selected]: selected },
    customClassName,
  );

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
