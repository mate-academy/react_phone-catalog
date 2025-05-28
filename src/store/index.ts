import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

const loadState = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    const serializedFavorites = localStorage.getItem('favorites');

    return {
      cart: serializedCart ? JSON.parse(serializedCart) : [],
      favorites: serializedFavorites ? JSON.parse(serializedFavorites) : [],
    };
  } catch (e) {
    return {
      cart: [],
      favorites: [],
    };
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const { cart, favorites } = store.getState();

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Storage save error', e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
