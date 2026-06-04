import React from 'react';

import styles from './ProductsList.module.scss';

import { ProductType } from '../../../../types/product.types';
import { ProductCard } from '../../../../components/ProductCard';

interface ProductListProps {
  products: ProductType[];
}

export const ProductsList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.productsList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
