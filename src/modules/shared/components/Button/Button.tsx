import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

type Props = {
  active?: boolean;
  className?: string;

  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  active,
  className,

  children,

  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(className, styles.button, {
        [styles['button--selected']]: active,
      })}
    >
      {children}
    </button>
  );
};
