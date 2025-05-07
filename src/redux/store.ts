import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const favoritesToSave = state.favorites;

  localStorage.setItem('favorites', JSON.stringify(favoritesToSave));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
