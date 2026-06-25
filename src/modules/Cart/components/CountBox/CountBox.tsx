import React from 'react';
import styles from './CountBox.module.scss';
import { Product } from '../../../../ProductsContext/TabsContext';

interface CountBoxProps {
  count: number;
  removeItemfromCart: (id: number) => void;
  addItemInCart: (id: number) => void;
  element: Product;
}

export const CountBox: React.FC<CountBoxProps> = ({
  count,
  removeItemfromCart,
  addItemInCart,
  element,
}) => {
  return (
    <div className={styles.countBox}>
      <button
        onClick={() => removeItemfromCart(element.id)}
        className={`${styles.button} ${styles.commonButton} ${count > 1 ? styles.buttonActive : ''}`}
      >
        -
      </button>
      <div className={styles.commonButton}>{count}</div>
      <button
        onClick={() => addItemInCart(element.id)}
        className={`${styles.button} ${styles.commonButton} ${styles.buttonActive}`}
      >
        +
      </button>
    </div>
  );
};
