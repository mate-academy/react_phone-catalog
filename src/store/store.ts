import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './slices/products';

const rootReducer = combineSlices(productsSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
