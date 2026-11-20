import React from 'react';

import { SkeletonProduct } from '../Skeletons/SkeletonProduct';
import { ProductCard } from '../ProductCard';

import { Product } from '../../types/Product';

import styles from './ProductList.module.scss';

type Props = {
  isLoading: boolean;
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ isLoading, products }) => {
  const renderProducts = () => {
    if (isLoading) {
      return Array.from({ length: 8 }, (_, index) => (
        <SkeletonProduct key={index} />
      ));
    }

    return products.map(product => (
      <ProductCard key={product.itemId} product={product} />
    ));
  };

  return (
    <section className={styles['product-list']}>
      <div className={styles['product-list__grid']}>{renderProducts()}</div>
    </section>
  );
};
