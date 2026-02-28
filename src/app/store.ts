import { configureStore } from '@reduxjs/toolkit';
import { favoritesSlice } from '../features/favorite/favoritesSlice';
import { cartSlice } from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
