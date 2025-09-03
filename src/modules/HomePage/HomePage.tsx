/* eslint-disable import/extensions */
import React from 'react';

import '@/styles/main.scss';

import { PromoSlider } from './PromoSlider/PromoSlider';
import styles from './HomePage.module.scss';
import classNames from 'classnames';
import { Categories } from './Categories';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ProductBrief } from '@/types/ProductBrief';
import { useProducts } from '@/hooks/useProducts';

export const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts();

  const newProducts = products
    .slice(0, 20)
    .sort((p1: ProductBrief, p2: ProductBrief) => p2.year - p1.year);

  const hotPriceProducts = products
    .slice(0, 12)
    .sort(
      (p1: ProductBrief, p2: ProductBrief) =>
        p2.fullPrice - p2.price - (p1.fullPrice - p1.price),
    );

  return (
    <main className={classNames(styles.home_page, 'container')}>
      <h1 className={styles.home_page__heading}>
        Welcome to Nice Gadgets store!
      </h1>
      <PromoSlider></PromoSlider>
      <ProductsSlider
        title={'Brand new products'}
        products={newProducts}
        loading={loading}
        error={error}
      ></ProductsSlider>
      <Categories></Categories>
      <ProductsSlider
        title={'Hot prices'}
        products={hotPriceProducts}
        loading={loading}
        error={error}
      ></ProductsSlider>
    </main>
  );
};
