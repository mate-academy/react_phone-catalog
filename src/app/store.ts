
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/ProductSlice';
const store = configureStore({
  reducer: {
    products: productsReducer,
  }
})

export default store;

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
