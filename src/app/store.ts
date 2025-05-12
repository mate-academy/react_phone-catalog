import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import filterReducer from '../features/filter';
import cartReducer from '../features/cart';
import favoritesReducer from '../features/favorites';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
