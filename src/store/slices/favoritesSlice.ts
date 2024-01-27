import { LocaleStorage } from '../../definitions/enums/LocaleStorage';
import { getLocaleStorageParamsForProductsSlices } from '../utils/createLocaleStorageProductsSlice';

const favoritesSlice = getLocaleStorageParamsForProductsSlices({
  name: 'favorites',
  key: LocaleStorage.Favorites,
});

export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
