import React from 'react';
import styles from './ProductsGrid.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';

interface Props {
  products: Product[];
}

export const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
