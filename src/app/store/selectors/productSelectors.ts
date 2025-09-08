import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectProducts = (state: RootState) => state.product.items;

// Filter by category
export const selectProductsByCategory = createSelector(
  [
    selectProducts,
    (_: RootState, categoryName: string | undefined) => categoryName,
  ],
  (products, categoryName) =>
    categoryName ? products.filter((p) => p.category === categoryName) : []
);

// Sort products
export const selectSortedProducts = createSelector(
  [
    selectProductsByCategory,
    (_: RootState, __: string | undefined, sort: string) => sort,
  ],
  (filteredProducts, sort) => {
    return [...filteredProducts].sort((a, b) => {
      switch (sort) {
        case "age":
          return b.year - a.year;
        case "title":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }
);

// Pagination
export const selectPaginatedProducts = createSelector(
  [
    selectSortedProducts,
    (_: RootState, __: string | undefined, ___: string, page: number) => page,
    (_: RootState, __: string | undefined, ___: string, ____, perPage: number) =>
      perPage,
  ],
  (sortedProducts, page, perPage) => {
    const start = (page - 1) * perPage;
    return sortedProducts.slice(start, start + perPage);
  }
);


