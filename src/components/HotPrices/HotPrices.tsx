import React from 'react';

import styles from './HotPrices.module.scss';
import { ProductsSlider } from '../ProductsSlider';

interface HotPricesProps {
  title: string;
}

export const HotPrices: React.FC<HotPricesProps> = ({ title }) => {
  return (
    <section className={styles.hotPrices}>
      <ProductsSlider title={title} />
    </section>
  );
};
