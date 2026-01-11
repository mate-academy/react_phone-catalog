import { createSelector } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import type { RootState } from '../store';
import { Category, Sort } from '../types';

const selectProductsResult = productsApi.endpoints.getProducts.select();

export const selectAllProducts = createSelector(
  [selectProductsResult],
  result => result.data ?? [],
);

export const selectPreparedProducts = createSelector(
  [
    selectAllProducts,
    (_state: RootState, category: Category | null) => category,
    (_state: RootState, _category: Category | null, sortBy: Sort = Sort.Age) =>
      sortBy,
  ],
  (products, category, sortBy) => {
    const filteredProducts = category
      ? products.filter(product => product.category === category)
      : products;

    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case Sort.Title:
          return a.name.localeCompare(b.name);
        case Sort.Price:
          return a.price - b.price;
        case Sort.Age:
        default:
          return b.year - a.year;
      }
    });
  },
);
