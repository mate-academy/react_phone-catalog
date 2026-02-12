import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { initialDataSlice } from './initialDataSlice/initialDataSlice';
import { favoritesSlice } from './favoritesSlice/favoritesSlice';
import { cartSlice } from './cartSlice/cartSlice';

const rootReducer = combineSlices(initialDataSlice, favoritesSlice, cartSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
