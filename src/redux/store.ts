import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from '@/redux/cartSlice';
import { favoritesReducer } from '@/redux/favoritesSlice';

const savedFavorites = localStorage.getItem('favorites');
const savedCart = localStorage.getItem('cart');

const preloadedState = {
  favorites: {
    favorite_ids: savedFavorites ? JSON.parse(savedFavorites) : [],
  },
  cart: {
    items: savedCart ? JSON.parse(savedCart) : [],
  },
};

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  const favoriteIds = state.favorites.favorite_ids;
  const cartItems = state.cart.items;

  if (favoriteIds.length > 0) {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  } else {
    localStorage.removeItem('favorites');
  }

  if (cartItems.length > 0) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } else {
    localStorage.removeItem('cart');
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
