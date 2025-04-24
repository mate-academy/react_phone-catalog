import React from 'react';
import styles from './ProductsNotFound.module.scss';
import '../../styles/App.scss';

const ProductNotFound: React.FC = () => {
  return (
    <img
      src="./img/product-not-found.png"
      alt="Product not found"
      className={styles['products-not-found']}
    />
  );
};

export default ProductNotFound;
