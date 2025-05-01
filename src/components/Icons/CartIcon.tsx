import React from 'react';
import styles from './Icons.module.scss';

interface CartIconProps {
  count?: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ count = 0 }) => {
  return (
    <div className={styles.icon}>
      <span className={styles.icon__cart}>
        {count > 0 && <span className={styles.icon__count}>{count}</span>}
      </span>
    </div>
  );
};
