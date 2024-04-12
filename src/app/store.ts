import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import productDetailsReducer
  from '../features/productDetails/productDetailsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
