/* eslint-disable @typescript-eslint/indent */
// src/styles/ProductPageLayout.tsx

import React, { useState } from 'react';
import styles from './ProductPageLayout.module.scss';
import { ProductsList } from '../component/ProductList/ProductList';
import { Product } from '../types/Product';

type Props = {
  title: string;
  products: Product[];
};

const sortProductsByPrice = (
  products: Product[],
  order: 'default' | 'low-to-high' | 'high-to-low',
): Product[] => {
  const sorted = [...products];

  if (order === 'low-to-high') {
    return sorted.sort(
      (a, b) => (a.priceDiscount ?? a.price) - (b.priceDiscount ?? b.price),
    );
  }

  if (order === 'high-to-low') {
    return sorted.sort(
      (a, b) => (b.priceDiscount ?? b.price) - (a.priceDiscount ?? a.price),
    );
  }

  return products;
};

export const ProductPageLayout: React.FC<Props> = ({ title, products }) => {
  const [sortOrder, setSortOrder] = useState<
    'default' | 'low-to-high' | 'high-to-low'
  >('default');

  const sortedProducts = sortProductsByPrice(products, sortOrder);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.sortControl}>
          <label htmlFor="sort-select">Sorted</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={e =>
              setSortOrder(
                e.target.value as 'default' | 'low-to-high' | 'high-to-low',
              )
            }
          >
            <option value="default">default</option>
            <option value="low-to-high">low-to-high</option>
            <option value="high-to-low">high-to-low</option>
          </select>
        </div>

        <div className={styles.content}>
          <ProductsList products={sortedProducts} />
        </div>
      </div>
    </section>
  );
};
