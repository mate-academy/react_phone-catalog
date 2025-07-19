import React from 'react';
import styles from './ProductsGrid.module.scss';

import { ProductCard } from '../../../../components/ProductCard';
import { ProductCardData } from '../../../../types/Product';

type Props = {
  products: ProductCardData[];
};

export const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
