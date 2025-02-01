import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../state/favouriteSlice';
import cartReducer from '../state/cartSlice';
import productsReducer from '../state/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favourites: favouritesReducer, // Передаємо редюсер
    cart: cartReducer, // Передаємо редюсер
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
