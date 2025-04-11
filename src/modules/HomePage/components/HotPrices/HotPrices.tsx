import React from 'react';
import styles from './HotPrices.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { Product } from '../../../../types/products';
// eslint-disable-next-line max-len
import ProductsSlider from '../../../../components/ProductsSlider/ProductsSlider';

const HotPrices = () => {
  const products = useAppSelector<Product[]>(state => state.store.products);
  const hotPricesProducts = products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <section className={styles.hotPrices}>
      <h2 className={styles.hotPrices__title}>Hot prices</h2>
      <div className={styles.hotPrices__slider}>
        <ProductsSlider products={hotPricesProducts} />
      </div>
    </section>
  );
};

export default HotPrices;
