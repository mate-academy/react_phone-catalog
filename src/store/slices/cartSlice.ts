import { LocaleStorage } from '../../definitions/enums/LocaleStorage';
import { getLocaleStorageParamsForProductsSlices } from '../utils/createLocaleStorageProductsSlice';

const cartSlice = getLocaleStorageParamsForProductsSlices({
  name: 'cart',
  key: LocaleStorage.Cart,
});


export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
