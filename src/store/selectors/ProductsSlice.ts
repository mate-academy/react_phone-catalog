import { createSelector } from '@reduxjs/toolkit';
import { StoreModel } from '../storeModel';

export const selectProductReducer = (state: StoreModel) => {
  return state.productsReducer;
};

export const selectProducts = createSelector(selectProductReducer, ({
  isLoading,
  error,
  products,
  searchbar,
}) => {
  const filteredProduct = products?.filter(item => {
    return item.name.toLowerCase().includes(searchbar.toLowerCase());
  });

  return {
    isLoading,
    error,
    products: filteredProduct,
    searchbar,
  };
});
