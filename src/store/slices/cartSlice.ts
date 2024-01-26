import { LocaleStorage } from '../../definitions/enums/LocaleStorage';
import { createLocaleStorageProductsSlice } from '../utils/createLocaleStorageProductsSlice';

const cartSlice = createLocaleStorageProductsSlice({
  name: 'cart',
  key: LocaleStorage.Cart,
});


export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
