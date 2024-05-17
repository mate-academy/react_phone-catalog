import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productssSlice from '../features/productssSlice';

export const store = configureStore({
  reducer: {
    products: productssSlice,
    // selectedProduct: productInfoSlice,
    // favourites: favSlice,
    // cartItems: cartSlice,
    // themeSwitcher: themeSlice,
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
