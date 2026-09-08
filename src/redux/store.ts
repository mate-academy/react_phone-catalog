import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cartSlice';
import favReducer from './favSlice';

export const store = configureStore({
  reducer: {
    cart: cardReducer,
    favorites: favReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('cart', JSON.stringify(state.cart.items));
  localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
