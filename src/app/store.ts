import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import filterReducer from '../features/filter';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
