import { createSelector } from '@reduxjs/toolkit';
import { StoreModel } from '../storeModel';

export const selectCartReducer = (state: StoreModel) => {
  return state.cartReducer;
};

export const selectCart = createSelector(selectCartReducer, ({
    cart,
}) => {
  return {
    cart
  };
});
