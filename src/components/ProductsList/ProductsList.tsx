import { Product } from '@/shared/type';
import styles from './styles.module.scss';
import { ProductCard } from '../ProductCard';
import React, { Fragment } from 'react';

type Props = {
  products: Product[] | null;
  isLoading: boolean;
  length: number;
};

export const ProductsList: React.FC<Props> = ({ isLoading, length, products }) => {
  return (
    <div className={styles.container}>
      {isLoading &&
        Array.from({ length: length }).map((_, index) => {
          return (
            <div key={index} className={styles.productCard}>
              <ProductCard></ProductCard>
            </div>
          );
        })}
      {!isLoading &&
        products &&
        products.length !== 0 &&
        Array.from({ length: length }).map((_, index) => {
          const product: Product | undefined = products ? products[index] : undefined;

          return product ? (
            <div key={product.itemId} className={styles.productCard}>
              <ProductCard product={product}></ProductCard>
            </div>
          ) : (
            <Fragment key={index}> </Fragment>
          );
        })}
    </div>
  );
};
