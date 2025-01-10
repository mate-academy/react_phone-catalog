import React from 'react';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { Product } from '../../../types/Product';
import styles from './Accessories.module.scss';

interface AccessoriesListProps {
  products: Product[];
}

export const AccessoriesList: React.FC<AccessoriesListProps> = ({
  products,
}) => {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
