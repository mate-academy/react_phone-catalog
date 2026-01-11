import { favouritesAdapter } from '../features/favouritesSlice';
import type { Product } from '../types';
import type { RootState } from '../store';
import type { EntityState } from '@reduxjs/toolkit';

const selectors = favouritesAdapter.getSelectors();

export const favouritesSelectors = {
  selectAll: (state: RootState) =>
    selectors.selectAll(
      state.favourites as unknown as EntityState<Product, string>,
    ),
  selectById: (state: RootState, id: string) =>
    selectors.selectById(
      state.favourites as unknown as EntityState<Product, string>,
      id,
    ),
  selectTotal: (state: RootState) =>
    selectors.selectTotal(
      state.favourites as unknown as EntityState<Product, string>,
    ),
};
