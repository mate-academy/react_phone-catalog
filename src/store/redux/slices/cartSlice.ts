import { LocaleStorage } from '../../../definitions/enums/LocaleStorage';
import { getLocaleStorageProductsSlice } from '../utils/createLocaleStorageProductsSlice';

const cartSlice = getLocaleStorageProductsSlice({
  name: 'cart',
  key: LocaleStorage.Cart,
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = cartSlice.selectors;
