import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
