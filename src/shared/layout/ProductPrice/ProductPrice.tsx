import React from 'react';
import styles from './ProductPrice.module.scss';

type Props = {
  fullPrice: number;
  price: number;
  withPseudo?: boolean;
};

export const ProductPrice: React.FC<Props> = ({
  fullPrice,
  price,
  withPseudo,
}) => {
  return (
    <div
      className={`${styles.product__prices} ${withPseudo ? styles.withPseudo : ''}`}
    >
      <div className={styles.product__price}>
        ${fullPrice > price ? price : fullPrice}
      </div>
      {fullPrice > price && (
        <div className={styles.product__fullprice}>${fullPrice}</div>
      )}
    </div>
  );
};
