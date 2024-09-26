import React from 'react';
import { ProductCard } from '../ProductCard';
import { Products } from '../../utils/types';
import styles from './ProductsList.module.scss';

type Props = {
  products: Products[];
};
export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products__list}>
      {products.map((product: Products) => {
        return (
          <div key={product.id} className={styles.products__item}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};
