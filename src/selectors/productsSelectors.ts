import { createSelector } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import { Category, Sort } from '../types';

export const selectProducts = createSelector(
  [productsApi.endpoints.getProducts.select()],
  ({ data = [] }) => data,
);

export const selectProductsByCategory = (category: Category) =>
  createSelector([selectProducts], products =>
    products.filter(product => product.category === category),
  );

export const selectSortedProducts = (sortBy: Sort) =>
  createSelector([selectProducts], products => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case Sort.Title:
          return a.name.localeCompare(b.name);
        case Sort.Price:
          return b.fullPrice - b.price - a.fullPrice - a.price;
        case Sort.Age:
        default:
          return b.year - a.year;
      }
    });
  });

export const selectSortedProductsByCategory = (
  category: Category,
  sortBy: Sort,
) =>
  createSelector([selectProducts], products => {
    return [...products]
      .filter(product => product.category === category)
      .sort((a, b) => {
        switch (sortBy) {
          case Sort.Title:
            return a.name.localeCompare(b.name);
          case Sort.Price:
            return b.fullPrice - b.price - a.fullPrice - a.price;
          case Sort.Age:
          default:
            return b.year - a.year;
        }
      });
  });
