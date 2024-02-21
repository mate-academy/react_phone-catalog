import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import favoritesReducer from './slices/favSlice';
import cartReducer from './slices/cartSlice';
import productDetailsReducer from './slices/productDetailsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    cartItems: cartReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
