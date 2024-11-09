import React from 'react';
import image from '../../../public/img/product-not-found.png';
import styles from './productNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.page_title}>Product Not Found</h2>
      <img src={image} alt="page not found" className={styles.page_img} />
    </div>
  );
};
