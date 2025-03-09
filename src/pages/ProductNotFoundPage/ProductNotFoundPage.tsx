import styles from './ProductNotFoundPage.module.scss';
import React from 'react';

export const ProductNotFoundPage: React.FC = () => {
  return (
    <div className={styles['product-not-found-page']}>
      <div className={styles['product-not-found-page__content']}>
        <h1 className={styles['product-not-found-page__title']}>
          Product Not Found
        </h1>

        <div className={styles['product-not-found-page__image-container']}>
          <img
            src="/img/product-not-found.png"
            alt="Product not found image"
            className={styles['product-not-found-page__image']}
          />
        </div>
      </div>
    </div>
  );
};
