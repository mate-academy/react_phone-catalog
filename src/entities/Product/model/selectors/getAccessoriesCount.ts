import { createSelector } from '@reduxjs/toolkit';
import { getAccessories } from './getAccessories';
import { Product } from '../types/product';

export const getAccessoriesCount = createSelector(
  getAccessories,
  (products: Product[]) => products.length,
);
