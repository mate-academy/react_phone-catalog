import { LocaleStorage } from '../../../definitions/enums/LocaleStorage';
import { getLocaleStorageProductsSlice } from '../utils/createLocaleStorageProductsSlice';

const favoritesSlice = getLocaleStorageProductsSlice({
  name: 'favorites',
  key: LocaleStorage.Favorites,
});

export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const favoritesSelector = favoritesSlice.selectors;
