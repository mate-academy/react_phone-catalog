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
      {products.length !== 0 && products.map((product) => {
        return (
          <div key={product.id} className={styles.productCard}>
            <ProductCard  product={product}></ProductCard>
          </div>
        );
      })}
 
      {products.length === 0 && Array.from({ length: 30 }).map((_, index) => {
        return (
          <div key={index} className={styles.productCard}>
            <ProductCard ></ProductCard>
          </div>
        );
      })}
    </div>
  );
};
