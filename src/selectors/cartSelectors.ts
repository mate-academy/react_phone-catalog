import { cartAdapter } from '../features/cartSlice';
import type { Product } from '../types';
import type { RootState } from '../store';
import type { EntityState } from '@reduxjs/toolkit';

const selectors = cartAdapter.getSelectors();

export const cartSelectors = {
  selectAll: (state: RootState) =>
    selectors.selectAll(state.cart as unknown as EntityState<Product, string>),
  selectById: (state: RootState, id: string) =>
    selectors.selectById(
      state.cart as unknown as EntityState<Product, string>,
      id,
    ),
  selectTotal: (state: RootState) =>
    selectors.selectTotal(
      state.cart as unknown as EntityState<Product, string>,
    ),
};
