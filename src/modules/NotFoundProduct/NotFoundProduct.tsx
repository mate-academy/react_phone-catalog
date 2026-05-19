import React from 'react';
import styles from './NotFoundProduct.module.scss';
import img from '../../images/product-not-found.png';

export const NotFoundProduct = () => {
  return (
    <div className={styles.page}>
      <h1>Not Found Product</h1>

      <div className={styles.image_box}>
        <img src={img} alt="Page not found" className={styles.image} />
      </div>
    </div>
  );
};
