import React from 'react';

import styles from './HotPrices.module.scss';
import { ProductsSlider } from '../ProductsSlider';
import { CatalogProducts } from '../../types/ProductTypes';

interface HotPricesProps {
  title: string;
  products: CatalogProducts[];
}

export const HotPrices: React.FC<HotPricesProps> = ({ title, products }) => {
  return (
    <section className={styles.hotPrices}>
      <ProductsSlider title={title} products={products} />
    </section>
  );
};
