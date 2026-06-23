import React from 'react';
import { CatalogProducts } from '../../types/Types';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

interface ProductListProps {
  products: CatalogProducts[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map(product => {
        return (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
