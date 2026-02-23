/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import cartsReducer from './slices/cartSlice';
import { saveToStorage } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartsReducer,
  },
});

store.subscribe(() => {
  saveToStorage('favorites', store.getState().favorites.items);
});

store.subscribe(() => {
  saveToStorage('cart', store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
