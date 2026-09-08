import React from 'react';
import styles from './ProductNotFound.module.scss';

import productNotFound from '../../images/product-not-found.png';

export const ProductNotFound: React.FC = () => {
  return (
    <div className={styles.productNotFound}>
      <h1 className={styles.productNotFound__title}>Product not found</h1>
      <img
        className={styles.productNotFound__image}
        src={productNotFound}
        alt="product-not-found"
      />
    </div>
  );
};
