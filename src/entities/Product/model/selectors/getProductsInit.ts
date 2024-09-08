import { createSelector } from '@reduxjs/toolkit';
import { getProducts } from './getProducts';

export const getProductsInit = createSelector(
  getProducts,
  products => products._inited,
);
