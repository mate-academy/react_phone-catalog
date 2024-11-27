import React from 'react';
import styles from './Counter.module.scss';

type CartIconProps = {
  itemCount: number;
  className?: string;
};

const CartIcon: React.FC<CartIconProps> = ({ itemCount, className }) => {
  return (
    <div className={className}>
      {itemCount > 0 && (
        <div className={styles.badge}>
          <span>{itemCount}</span>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
