/* eslint-disable import/extensions */
import { ProductBrief } from '@/types/ProductBrief';
import React from 'react';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: ProductBrief[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products_list}>
      {products.map(p => {
        return (
          <ProductCard
            key={p.id}
            product={p}
            link={`/${p.category.toLowerCase()}/${p.itemId}`}
          ></ProductCard>
        );
      })}
    </div>
  );
};
