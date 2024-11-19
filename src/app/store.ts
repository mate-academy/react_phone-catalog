import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productSlice } from '../features/products';

const rootReducer = combineSlices(productSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
