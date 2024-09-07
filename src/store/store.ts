import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './features/product/product.slice';
import favoriteSlice from './features/favorite/favorite.slice';
import cartSlice from './features/cart/cart.slice';
import phonesSlice from './features/phones/phones.slice';
import tabletSlice from './features/tablets/tablet.slice';
import accessoriesSlice from './features/accessories/accessories.slice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    favorite: favoriteSlice,
    cart: cartSlice,
    phone: phonesSlice,
    tablets: tabletSlice,
    accessories: accessoriesSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
