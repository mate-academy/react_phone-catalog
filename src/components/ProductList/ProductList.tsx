import React from 'react';
import cn from 'classnames';
import styles from './ProductList.module.scss';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';

export interface ProductListProps {
  products: Product[];
  className?: string;
}

export const ProductList: React.FC<ProductListProps> = ({ products, className = '' }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={cn(styles.grid, className)}>
      {products.map(p => (
        <div key={p.itemId ?? String(p.id)} className={styles.itemWrapper}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
};
