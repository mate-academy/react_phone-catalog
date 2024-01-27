import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productsSlice';
import { cartReducer } from './slices/cartSlice';
import { favoritesReducer } from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
