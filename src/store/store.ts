import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';
import productDetailsReducer from './slices/productDetailsSlice';

const store = configureStore({
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
