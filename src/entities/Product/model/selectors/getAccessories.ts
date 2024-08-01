import { ProductSchema } from './../types/product';
import { createSelector } from '@reduxjs/toolkit';
import { getProducts } from './getProducts';

export const getAccessories = createSelector(
  getProducts,
  (product: ProductSchema) =>
    product.products.filter(item => item.category === 'accessories'),
);
