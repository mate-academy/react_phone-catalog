/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store';

export const selectInCart = (state: AppState) => state.inCart.cart;
export const selectNumberOfItemsInCart = createSelector([selectInCart], cart =>
  Object.entries(cart).reduce(
    (total, [_id, count]) => total + Number(count),
    0,
  ),
);
