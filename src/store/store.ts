import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme/themeSlice';
import productsReducer from './products/productsSlice';
import favouritesReducer from './favourites/favouritesSlice';
import cartReducer from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    products: productsReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
