import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectDetailsById = (id: string) =>
  createSelector(
    (state: RootState) => state.productDetails.items,
    products => products.find(product => product.id === id),
  );
