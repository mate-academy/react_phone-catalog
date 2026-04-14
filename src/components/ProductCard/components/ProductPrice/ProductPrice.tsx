import React from 'react';
import styles from './ProductPrice.module.scss';

interface Props {
  price: number;
  fullPrice?: number;
  isDiscountHidden?: boolean;
}
export const ProductPrice: React.FC<Props> = ({ price, fullPrice, isDiscountHidden }) => {
  return (
    <div className={styles.priceContainer}>
      <span className={styles.price}>${price}</span>
      {!isDiscountHidden && fullPrice && <span className={styles.fullPrice}>${fullPrice}</span>}
    </div>
  );
};
