import { createSelector } from '@reduxjs/toolkit';
import { StoreModel } from '../storeModel';

export const selectProductDetailReducer = (state: StoreModel) => {
  return state.productDetailsReducer;
};

export const selectProductDetails = createSelector(selectProductDetailReducer, ({
  isLoading,
  error,
  product,
}) => {
  return {
    isLoading,
    error,
    product,
  };
});
