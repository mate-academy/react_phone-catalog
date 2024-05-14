import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice,
  },
});
