import React from 'react';

import styles from './productsList.module.scss';
import { ProductCard } from '../productCard';
import { Products } from '../../../../types/Products';

type Props = {
  products: Products[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
