import React from 'react';
import styles from './ProductPrices.module.scss';

interface Props {
  price: number;
  fullPrice?: number;
}

export const ProductPrices: React.FC<Props> = ({ price, fullPrice }) => (
  <p className={styles.container}>
    <span className={`${styles.prices} ${styles.prices__price}`}>{price}</span>

    {fullPrice && (
      <span className={`${styles.prices} ${styles.prices__fullPrice}`}>
        {fullPrice}
      </span>
    )}
  </p>
);
