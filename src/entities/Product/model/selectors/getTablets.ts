import { createSelector } from '@reduxjs/toolkit';
import { getProducts } from './getProducts';
import { ProductSchema } from '../types/product';

export const getTablets = createSelector(
  getProducts,
  (product: ProductSchema) =>
    product.products.filter(item => item.category === 'tablets'),
);
