import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <img
        src="img/product-not-found.png"
        alt="Product not found"
        className={styles.image}
      />
      <h2 className={styles.title}>Product not found</h2>
      <p className={styles.description}>
        We couldn&apos;t find the product you&apos;re looking for. It might be
        out of stock or no longer available.
      </p>
      <Link to="/" className={styles.button}>
        Back to Home
      </Link>
    </div>
  );
};
