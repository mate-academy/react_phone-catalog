import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
  className?: string;
}

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className={`${styles.productsList} ${className || ''}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          showDiscountBadge={false}
        />
      ))}
    </div>
  );
};
