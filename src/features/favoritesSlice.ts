import { LocaleStorage } from '../constants/LocaleStorage';
import { createLocaleStorageProductsSlice } from './utils/createLocaleStorageProductsSlice';

const favoritesSlice = createLocaleStorageProductsSlice({
  name: 'favorites',
  key: LocaleStorage.Favorites,
});

export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
