import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
