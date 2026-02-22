import React from 'react';
import styles from './ProductsList.module.scss';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => (
  <div className={styles.list}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
