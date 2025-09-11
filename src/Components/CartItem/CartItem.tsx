import React, { useState } from 'react';
import styles from './CartItem.module.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => setCount(prev => prev + 1);
  const handleDecrease = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.container}>
        <button className={styles.removeBtn}></button>

        <img src={product.image} alt={product.name} className={styles.image} />

        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div onClick={handleDecrease} className={styles.btnMin}></div>
        <span className={styles.count}>{count}</span>
        <div onClick={handleIncrease} className={styles.btnPlus}></div>
        <p className={styles.price}>${product.price * count}</p>
      </div>
    </div>
  );
};
