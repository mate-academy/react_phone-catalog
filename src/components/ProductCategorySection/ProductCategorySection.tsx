/* eslint-disable @typescript-eslint/indent */

import React, { useEffect, useState } from 'react';
import { Category } from '../../types/Category';

import { ProductCategoryCard } from '../ProductCategoryCard';

import styles from './ProductCategorySection.module.scss';
import { getProducts } from '../../api/products';
import { productsFilter } from '../../utils/productsFilter';

export const ProductCategorySection = () => {
  const [productsAmountByCategory, setProductsAmountByCategory] = useState<
    Record<Category, number>
  >({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    getProducts().then(products => {
      const newAmount: Record<Category, number> = {
        phones: 0,
        tablets: 0,
        accessories: 0,
      };

      newAmount.phones = productsFilter.byCategory(
        products,
        Category.Phone,
      ).length;

      newAmount.tablets = productsFilter.byCategory(
        products,
        Category.Tablet,
      ).length;

      newAmount.accessories = productsFilter.byCategory(
        products,
        Category.Accessories,
      ).length;

      setProductsAmountByCategory(newAmount);
    });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h2>Shop by category</h2>
        </div>
        <div className={styles['product-category__categories-wrapper']}>
          <ProductCategoryCard
            title="Mobile Phone"
            productsAmount={productsAmountByCategory.phones}
            category={Category.Phone}
          />
          <ProductCategoryCard
            title="Tablet"
            productsAmount={productsAmountByCategory.tablets}
            category={Category.Tablet}
          />
          <ProductCategoryCard
            title="Accessories"
            productsAmount={productsAmountByCategory.accessories}
            category={Category.Accessories}
          />
        </div>
      </div>
    </section>
  );
};
