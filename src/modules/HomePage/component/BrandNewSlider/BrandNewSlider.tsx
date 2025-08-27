import React from 'react';
import styles from './BrandNewSlider.module.scss';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../../component/ProductsSlider';

type Props = {
  products: Product[];
};

export const BrandNewSlider: React.FC<Props> = ({ products }) => {
  const sortedByNewest = [...products].sort((a, b) => b.year! - a.year!);

  return (
    <div className={styles.brandNewSlider}>
      <ProductsSlider products={sortedByNewest} title="Brand new models" />
    </div>
  );
};
