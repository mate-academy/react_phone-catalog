import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};
export const Button: React.FC<Props> = ({
  className = '',
  children,
  ...props
}) => (
  <button type="button" className={clsx(styles.button, className)} {...props}>
    {children}
  </button>
);
