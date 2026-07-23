import classNames from 'classnames';

import React from 'react';
import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
};

export const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  isActive,
  className,
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, className, {
        [styles.buttonAdded]: isActive,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
