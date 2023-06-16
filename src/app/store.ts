import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line max-len
import favoriteProductsReducer from '../features/favoriteProducts/favoriteProductsSlice';
import shoppingCounterReducer from '../features/shoppingCart/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    favoriteProducts: favoriteProductsReducer,
    shoppingCart: shoppingCounterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
