import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';
import { favoritesReducer } from './favoritesSlice';
import { saveToLocalStorage } from './localStorage';
import themeReducer from './themeSlice';
const CART_STORAGE_KEY = 'cart';
const FAVORITES_STORAGE_KEY = 'favorites';

import languageReducer from './languageSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveToLocalStorage(CART_STORAGE_KEY, state.cart.items);
  saveToLocalStorage(FAVORITES_STORAGE_KEY, state.favorites.itemIds);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
