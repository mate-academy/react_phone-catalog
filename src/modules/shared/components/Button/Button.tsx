import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  option?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<Props> = ({
  children,
  onClick,
  option = 'primary',
  className,
  type = 'button',
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles['button--primary']]: option === 'primary',
          [styles['button--secondary']]: option === 'secondary',
          [styles['button--outline']]: option === 'outline',
        },
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
