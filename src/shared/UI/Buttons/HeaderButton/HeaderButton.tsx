import React from 'react';
import styles from './HeaderButton.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  counter?: number;
}

export const HeaderButton: React.FC<Props> = ({
  to,
  onClick,
  children,
  className,
  active,
  counter = 0,
}) => {
  if (to) {
    return (
      <Link
        className={cn(`${styles.button} ${className}`, {
          [styles.active]: active,
        })}
        to={to}
      >
        {counter > 0 && <div className={styles.bagCounter}>{counter}</div>}
        {children}
      </Link>
    );
  }

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {counter > 0 && <div className={styles.bagCounter}>{counter}</div>}
      {children}
    </button>
  );
};
