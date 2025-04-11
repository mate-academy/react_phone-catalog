import React from 'react';
import styles from './Brands.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { Product } from '../../../../types/products';
// eslint-disable-next-line max-len
import ProductsSlider from '../../../../components/ProductsSlider/ProductsSlider';

const Brands = () => {
  const products = useAppSelector<Product[]>(state => state.store.products);
  const currentYear = new Date().getFullYear();
  const brandsProduct = [...products]
    .sort((a, b) => b.year - a.year)
    .filter(el => el.year >= currentYear - 3);

  return (
    <section className={styles.brand}>
      <h2 className={styles.brand__title}>Brand new models</h2>
      <div className={styles.brand__slider}>
        <ProductsSlider products={brandsProduct} />
      </div>
    </section>
  );
};

export default Brands;
