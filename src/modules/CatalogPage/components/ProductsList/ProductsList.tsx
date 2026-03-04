/* eslint-disable @typescript-eslint/indent */
import React from 'react';

import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../../components/ProductCard';
import { ProductSkeleton } from '../../../../components/ProductSkeleton';

import styles from './ProductsList.module.scss';

type Props = {
  isLoading: boolean;
  products: Product[];
};

const skeletons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ProductsList: React.FC<Props> = ({ isLoading, products }) => {
  return (
    <div className={styles.list}>
      {isLoading
        ? skeletons.map(skel => (
            <div key={skel} className={styles.item}>
              <ProductSkeleton />
            </div>
          ))
        : products.map(product => (
            <div key={product.id} className={styles.item}>
              <ProductCard product={product} />
            </div>
          ))}
    </div>
  );
};
