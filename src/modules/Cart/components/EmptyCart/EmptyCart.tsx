import React from 'react';

import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <img
      src="/img/cart-is-empty.png"
      alt="Cart is empty"
      className={styles.img}
    />
  );
};
