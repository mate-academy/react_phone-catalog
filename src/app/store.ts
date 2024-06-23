import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
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
