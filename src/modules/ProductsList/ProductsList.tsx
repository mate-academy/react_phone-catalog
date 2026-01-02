import apiProducts from '../../../public/api/products.json';
import styles from './ProductsList.module.scss';
import React from 'react';
import { ProductCard } from '../shared/ProductCard/ProductCard';

export const ProductsList: React.FC<{ category: string }> = ({ category }) => {
  const filteredProducts = apiProducts.filter(
    product => product.category === category,
  );

  return (
    <>
      <div className={styles.productsList}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
