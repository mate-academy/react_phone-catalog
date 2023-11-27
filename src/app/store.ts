import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import favoriteReducer from '../feature/favorite';
import basketReducer from '../feature/basket';

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    basket: basketReducer,
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

export const basketItems = (state: RootState) => state.basket;
export const favoriteItems = (state: RootState) => state.favorite;
