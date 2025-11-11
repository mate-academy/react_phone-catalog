import { configureStore, Middleware } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favorites/favoritesSlice';
import { productsApi } from './services/productsApi';

export const favoritesMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const typedAction = action as { type: string };

  if (typedAction.type.startsWith('favorites/')) {
    const state = store.getState();

    localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
  }

  return result;
};

const preloadedState = {
  favorites: {
    items: JSON.parse(localStorage.getItem('favorites') || '[]'),
  },
};

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(favoritesMiddleware) // кастомний middleware
      .concat(productsApi.middleware), // RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
