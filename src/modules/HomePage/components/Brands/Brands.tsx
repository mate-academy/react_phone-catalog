import React from 'react';
import styles from './Brands.module.scss';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

const Brands = () => {
  return (
    <section className={styles.brand}>
      <h2 className={styles.brand__title}>Brand new models</h2>
      <div className={styles.brand__slider}>
        <ProductsSlider />
      </div>
    </section>
  );
};

export default Brands;
