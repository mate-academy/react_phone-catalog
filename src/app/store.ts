import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/productsSlice';
import favouritesReducer from '../features/favouritesSlice';
import cartReducer from '../features/cartSlice';
import productDetailsReducer from '../features/productDetailsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favourites: favouritesReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
