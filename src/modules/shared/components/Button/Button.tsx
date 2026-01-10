import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

type Variant = 'primary' | 'ghost';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = 'primary',
  ...rest
}) => (
  <button
    type="button"
    {...rest}
    className={classNames(styles.button, styles[variant], className)}
  >
    {children}
  </button>
);
