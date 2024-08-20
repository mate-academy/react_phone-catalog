import { configureStore } from '@reduxjs/toolkit';
import favSlice from '../features/favSlice';
import cartSlice from '../features/cartSlice';
import productsSlice from '../features/productsSlice';
import themeSlice from '../features/themeSlice';
import productInfoSlice from '../features/productInfoSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    selectedProduct: productInfoSlice,
    favourites: favSlice,
    cartItems: cartSlice,
    themeSwitcher: themeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
