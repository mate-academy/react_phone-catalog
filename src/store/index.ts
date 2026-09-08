import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products';
import favoritesReducer from './favorites';
import cartReducer from './cart';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

let prevCart = store.getState().cart;
let prevFavorites = store.getState().favorites;

store.subscribe(() => {
  const state = store.getState();

  if (prevCart !== state.cart) {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    prevCart = state.cart;
  }

  if (prevFavorites !== state.favorites) {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    prevFavorites = state.favorites;
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
