import { createSelector } from '@reduxjs/toolkit';
import { getProductsPage } from './getProductsPage';
import { ProductPageSchema } from '../types/ProductPageSchema';

export const getPagesCount = createSelector(
  getProductsPage,
  (productsPage: ProductPageSchema) => productsPage.pagesCount,
);
