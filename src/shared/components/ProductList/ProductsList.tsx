import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
import React from 'react';
import { Product } from '../../../types/product';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => (
  <div className={styles.list}>
    {products.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        showOldPrice={product.fullPrice > product.price}
      />
    ))}
  </div>
);
