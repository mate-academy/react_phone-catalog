import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favorites';
import cartReducer from '../features/cart';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
  localStorage.setItem('cart', JSON.stringify(state.cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
