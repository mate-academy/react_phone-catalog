import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  classNames?: string;
};

const Button: React.FC<ButtonProps> = ({ children, classNames, ...props }) => {
  return (
    <button {...props} className={`${styles.button} ${classNames}`}>
      {children}
    </button>
  );
};

export default Button;
