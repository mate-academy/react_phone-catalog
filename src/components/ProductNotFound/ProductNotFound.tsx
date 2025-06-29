import React from 'react';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  return (
    <div className={styles.productNotFound}>
      <h1 className={styles.productNotFound__title}>Product not found</h1>
      <img
        className={styles.productNotFound__image}
        src="../src/images/product-not-found.png"
        alt="page-not-found"
      />
    </div>
  );
};
