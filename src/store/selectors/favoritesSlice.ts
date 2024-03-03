import { createSelector } from '@reduxjs/toolkit';
import { StoreModel } from '../storeModel';
import { selectProductReducer } from './ProductsSlice';

export const selectFavoritesReducer = (state: StoreModel) => {
  return state.favoritesReduces;
};

export const selectFavorites = createSelector(selectFavoritesReducer, selectProductReducer,({
  favorites,

}, {searchbar} ) => {

  const filteredFavorites = favorites?.filter(item => {
    return item.name.toLowerCase().includes(searchbar.toLowerCase());
  });

  return {
    favorites: filteredFavorites,
  };
});
