import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { getTablets } from './getTablets';

export const getTabletsCount = createSelector(
  getTablets,
  (product: Product[]) => product.length,
);
