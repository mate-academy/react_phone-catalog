import { createSelector } from '@reduxjs/toolkit';
import { cartAdapter } from '../features/cartSlice';
import type { RootState } from '../../../store';

const selectors = cartAdapter.getSelectors((state: RootState) => state.cart);

export const cartSelectors = {
  selectAll: selectors.selectAll,
  selectById: selectors.selectById,
  selectIsInCart: createSelector(selectors.selectById, product => !!product),
  selectTotalQuantity: createSelector(selectors.selectAll, products =>
    products.reduce(
      (totalQuantity, product) => totalQuantity + product.quantity,
      0,
    ),
  ),
  selectTotalAmount: createSelector(selectors.selectAll, products =>
    products.reduce(
      (totalAmount, product) => totalAmount + product.price * product.quantity,
      0,
    ),
  ),
};
