import { createSelector } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import type { RootState } from '../../../store';
import { Category, Sort } from '../../../types';
import { getVisiblePages } from '../utilities/paginationUtils';

const selectProductsResult = productsApi.endpoints.getProducts.select();

export const selectAllProducts = createSelector(
  [selectProductsResult],
  result => result.data ?? [],
);

export const selectPreparedProducts = createSelector(
  [
    selectAllProducts,
    (_state: RootState, category: Category | null) => category,
    (_state: RootState, _category: Category | null, sortBy: Sort) => sortBy,
    (
      _state: RootState,
      _category: Category | null,
      _sortBy: Sort,
      perPage: number,
    ) => perPage,
    (
      _state: RootState,
      _category: Category | null,
      _sortBy: Sort,
      _perPage: number,
      currentPage: number,
    ) => currentPage,
    (
      _state: RootState,
      _category: Category | null,
      _sortBy: Sort,
      _perPage: number,
      _currentPage: number,
      query: string,
    ) => query,
  ],
  (products, category, sortBy, perPage, currentPage, query) => {
    let filteredProducts = category
      ? products.filter(product => product.category === category)
      : products;

    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case Sort.Title:
          return a.name.localeCompare(b.name);
        case Sort.Price:
          return a.price - b.price;
        case Sort.Discount:
          return b.fullPrice - b.price - (a.fullPrice - a.price);
        case Sort.Age:
        default:
          return b.year - a.year;
      }
    });

    const totalProducts = sortedProducts.length;

    const limit = perPage === Infinity ? totalProducts : perPage;
    const totalPages = Math.ceil(totalProducts / limit) || 1;
    const safePage = Math.max(1, Math.min(currentPage, totalPages));

    const startIndex = (safePage - 1) * limit;
    const endIndex = startIndex + limit;

    const visibleProducts = sortedProducts.slice(startIndex, endIndex);
    const visiblePages = getVisiblePages(safePage, totalPages, 4);

    return {
      visibleProducts,
      totalProducts,
      currentPage: safePage,
      visiblePages,
      totalPages,
    };
  },
);
