import { configureStore } from '@reduxjs/toolkit';
import cartProductsReducer from './features/cartProductsSlice';
import favoritesReducer from './features/favoritesSlice';
import queryReducer from './features/querySlice';

export const store = configureStore({
  reducer: {
    cartProducts: cartProductsReducer,
    favorites: favoritesReducer,
    query: queryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
