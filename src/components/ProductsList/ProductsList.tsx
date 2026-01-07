import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        /* Dodajemy wrapper, który kontroluje szerokość karty na różnych ekranach */
        <div key={product.id} className={styles.cardWrapper}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
