import React from 'react';
import { CatalogProducts } from '../../types/Types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  products: CatalogProducts[];
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
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
