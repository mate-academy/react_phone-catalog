import React from 'react';
import styles from './HotPricesSlider.module.scss';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../../component/ProductsSlider';

type Props = {
  products: Product[];
};

export const HotPricesSlider: React.FC<Props> = ({ products }) => {
  const sortedByDiscount = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <div className={styles.hotPricesSlider}>
      <ProductsSlider products={sortedByDiscount} title="Hot prices" />
    </div>
  );
};
