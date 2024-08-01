/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit';
import { getProducts } from './getProducts';
import { ProductSchema } from '../types/product';

export const getNewModels = createSelector(
  getProducts,
  (Product: ProductSchema) =>
    Product.products
      .filter(product => product.year === 2022)
      .sort((a, b) => b.fullPrice - a.fullPrice),
);
