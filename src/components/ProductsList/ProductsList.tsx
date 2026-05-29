import { Product } from '@/shared/type';
import styles from './styles.module.scss';
import { ProductCard } from '../ProductCard';
import React from 'react';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.container}>
      {products.map((product) => {
        return (
          <div className={styles.productCard}>
            <ProductCard key={product.id} product={product}></ProductCard>
          </div>
        );
      })}
    </div>
  );
};
