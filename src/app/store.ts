import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './reducers/product';
import { cartSlice } from './reducers/cart';

const rootReducer = combineSlices(productsSlice, cartSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
