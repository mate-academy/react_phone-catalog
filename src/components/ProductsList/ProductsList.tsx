import React from 'react';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
