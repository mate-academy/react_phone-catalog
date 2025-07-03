import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/ProductSlice';
import filterReducer from '../features/FilterSlice';
import paginationReducer from '../features/PaginationSlice';
import productDetailsReducer from '../features/ProductDetailsSlice';
import cartItemsReducer from '../features/CartSlice';
import favouriteReducer from '../features/FavouriteSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    productDetail: productDetailsReducer,
    cartItem: cartItemsReducer,
    favourite: favouriteReducer,
  },
});

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
