import React from "react";
import ProductNotFound from '../../../public/img/product-not-found.png';
import styles from './NotFoundProduct.module.scss';

export const NotFoundProduct: React.FC = () => {
  return (
    <div className={styles.not_found_product}>
      <img src={ProductNotFound} alt="Product not found" />
      <h1>{"Product not found :("}</h1>
    </div>
  )
}
