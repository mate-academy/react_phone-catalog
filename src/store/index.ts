import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import favoritesSlice from './slices/favoritesSlice';
import productsSlice from './slices/productsSlice'; // products

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
