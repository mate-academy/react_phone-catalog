import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
