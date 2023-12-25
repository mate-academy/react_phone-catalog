import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import productsReducer from '../features/productsSlice';
import productDetailsReducer from '../features/productDetailsSlice';
import cartItemsSlice from '../features/cartItemsSlice';
import favouriteItemsSlice from '../features/favouriteItemsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cartItems: cartItemsSlice,
    favouriteItems: favouriteItemsSlice,
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
