import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { getPhones } from './getPhones';

export const getPhonesCount = createSelector(
  getPhones,
  (product: Product[]) => product.length,
);
