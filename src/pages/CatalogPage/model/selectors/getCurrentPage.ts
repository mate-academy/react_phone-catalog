import { createSelector } from '@reduxjs/toolkit';
import { getProductsPage } from './getProductsPage';
import { ProductPageSchema } from '../types/ProductPageSchema';

export const getCurrentPage = createSelector(
  getProductsPage,
  (productsPage: ProductPageSchema) => productsPage.currentPage,
);
