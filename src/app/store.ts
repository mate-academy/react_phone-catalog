import { configureStore, Middleware } from '@reduxjs/toolkit';
import favoritesReducer from '../features/slices/favorites/favoritesSlice';
import cartListReducer from '../features/slices/cartSlice/cartSlice';

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  const state = store.getState();

  localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
  localStorage.setItem('cartList', JSON.stringify(state.cartList.items));

  return result;
};

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cartList: cartListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
