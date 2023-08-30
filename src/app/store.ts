// eslint-disable-next-line import/no-cycle
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import searchReducer from '../features/searchSlice';
import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
