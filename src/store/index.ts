import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('cart', JSON.stringify(state.cart.items));
  localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
