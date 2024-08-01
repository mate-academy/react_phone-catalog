/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit';
import { getProducts } from './getProducts';
import { ProductSchema } from '../types/product';

export const hotPriceProducts = createSelector(
  getProducts,
  (Product: ProductSchema) =>
    Product.products
      .filter(product => product.fullPrice !== product.price)
      .sort((a, b) => b.fullPrice - a.fullPrice),
);
