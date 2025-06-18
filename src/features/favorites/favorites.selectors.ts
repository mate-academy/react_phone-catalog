import { RootState } from '../../app/store';

export const selectFavoriteItems = (state: RootState) =>
  state.favorites.FavoriteItems;
export const selectFavoritesQuantity = (state: RootState) =>
  state.favorites.FavoriteItems.length;
