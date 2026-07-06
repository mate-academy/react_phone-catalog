import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectCartItems = (state: RootState) => state.cart;

export const selectTotalQuantity = createSelector(selectCartItems, cart =>
  cart.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], cart => {
  return cart.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0,
  );
});
