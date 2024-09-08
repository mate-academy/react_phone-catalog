import { createSelector } from '@reduxjs/toolkit';
import { getProducts } from './getProducts';

export const getItemsInfo = createSelector(
  getProducts,
  products => products.products,
);
