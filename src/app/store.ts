import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './features/products/productsSlice';
import { favouritesSlice } from './features/favourites/favouritesSlice';
import { cartSlice } from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
    [favouritesSlice.name]: favouritesSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
