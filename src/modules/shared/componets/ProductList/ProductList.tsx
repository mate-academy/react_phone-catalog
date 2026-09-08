import React from 'react';
import { ProductInfo } from '../../Utills/types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: ProductInfo[];
  hasDiscount: boolean;
};

export const ProductList: React.FC<Props> = ({ products, hasDiscount }) => {
  return (
    <div className={styles.product__list}>
      {products?.map(product => (
        <ProductCard
          product={product}
          hasDiscount={hasDiscount}
          key={product.id}
        />
      ))}
    </div>
  );
};
