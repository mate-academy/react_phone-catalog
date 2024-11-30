import React from 'react';
import styles from './Counter.module.scss';
import classNames from 'classnames';

type CartIconProps = {
  itemCount: number;
};

const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <div className={classNames(styles.counterWrapper)}>
      {itemCount > 0 && (
        <div className={styles.badge}>
          <span>{itemCount}</span>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
