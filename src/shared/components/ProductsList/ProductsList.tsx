import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => (
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
