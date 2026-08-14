import { Link } from 'react-router-dom';
import styles from '../NotFoundPage/NotFoundPage.module.scss';

import React from 'react';

export const ProductNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="./img/product-not-found.png"
          alt="Product not found"
          className={styles.image}
        />
        <h1 className={styles.title}>Product not found</h1>
        <p className={styles.text}>
          The product you are looking for doesn&apos;t exist or was removed.
        </p>
        <Link to="/phones" className={styles.button}>
          Back to Catalog
        </Link>
      </div>
    </div>
  );
};
