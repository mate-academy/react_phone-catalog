import React from 'react';
import { Category } from '../../types/Category';

import { ProductCategoryCard } from '../ProductCategoryCard';

import styles from './ProductCategorySection.module.scss';

type Props = {
  // products?: Product[];
};

export const ProductCategorySection: React.FC<Props> = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h2>Shop by category</h2>
        </div>
        <div className={styles['product-category__categories-wrapper']}>
          <ProductCategoryCard
            title="Mobile Phone"
            productsAmount={10}
            category={Category.Phone}
          />
          <ProductCategoryCard
            title="Tablet"
            productsAmount={10}
            category={Category.Tablet}
          />
          <ProductCategoryCard
            title="Accessories"
            productsAmount={10}
            category={Category.Accessories}
          />
        </div>
      </div>
    </section>
  );
};
