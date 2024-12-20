import React from 'react';
import styles from './ProductNotFound.module.scss';

const ProductNotFound: React.FC<{ currentPath: string }> = ({
  currentPath,
}) => {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.notFound__title}>
        There are no {currentPath.toLowerCase()} yet
      </h2>
      <div className={styles.notFound__img}>
        <img src="/public/img/product-not-found.png" alt="product not found" />
      </div>
    </div>
  );
};

export default ProductNotFound;
