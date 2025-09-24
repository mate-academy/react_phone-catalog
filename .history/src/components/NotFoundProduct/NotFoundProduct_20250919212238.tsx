import React from 'react';
import styles from './NotFoundProduct.module.scss';

export const NotFoundProduct = () => {
  return (
    <div>
      <h1 className={styles.title}>Product not found</h1>
      <img
        src="public/img/product-not-found.png"
        alt="Product not found"
        className={styles.image}
      />
    </div>
  );
};
