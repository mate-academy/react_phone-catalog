import { configureStore } from '@reduxjs/toolkit';
import cartProductsReducer from './features/cartProductsSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    cartProducts: cartProductsReducer,
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
